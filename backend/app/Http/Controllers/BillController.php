<?php

namespace App\Http\Controllers;

use App\Helpers\PushNotificationHelper;
use App\Models\Bill;
use App\Models\Resident;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\OverdueBillNotification;
use App\Models\House;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class BillController extends Controller
{
    // Display a listing of the bills
    public function index()
    {
        $bills = Bill::with('resident', 'transactions')->get();
        return response()->json($bills);
    }

    //get monthly bills
    public function getMonthlyBills(Request $request)
    {
        // Get the type of bills requested (paid or pending)
        // $status = $request->query('status', 'pending'); // Default to 'pending' if not provided
        $status = $request->status; // Default to 'pending' if not provided
    
        // Get the page number from the request or default to 1
        // $page = $request->query('page', 1);
        $page = $request->page;
    
        // Get the month and year from the request
        // $month = $request->query('month');
        $month = $request->month;
        // $year = $request->query('year');
        $year = $request->year;
    
        // Get the search term for homeowner's name, default to an empty string if not provided
        // $search = $request->query('search', '');
        $search = $request->search;
    
        // Build the query
        $query = Bill::with('resident.user','resident.house', 'transactions')
            ->where('status', $status)
            ->whereYear('due_date', $year)
            ->whereMonth('due_date', $month)
            ->orderBy('due_date', 'desc');
    
        // Apply search filter if a search term is provided
        if ($search) {
            $query->whereHas('resident.user', function($query) use ($search) {
                $query->where('firstname', 'like', "%$search%")
                      ->orWhere('lastname', 'like', "%$search%");
            });
        }
    
        // Paginate the results
        $bills = $query->paginate(10, ['*'], 'page', $page);
    
        // Return the response
        return response()->json([
            'bills' => $bills,
            'current_page' => $bills->currentPage(),
            'last_page' => $bills->lastPage(),
            'total' => $bills->total()
        ]);
    }

    public function getOverdueBills(Request $request, string $page)
    {
        // Fetch the search query from the request
        $search = $request->input('search', '');

        // Create a query for bills
        $query = Bill::with(['resident.user']) // Eager load Resident and User relationships
            ->where('status', 'overdue');  // Filter for overdue bills

        // If a search query is provided, filter by the resident's name
        if ($search) {
            $query->whereHas('resident.user', function ($q) use ($search) {
                $q->where('firstname', 'like', '%' . $search . '%')
                ->orWhere('lastname', 'like', '%' . $search . '%');
            });
        }

        // Order by the oldest due date
        $bills = $query->orderBy('due_date', 'asc')
            ->paginate(10, ['*'], 'page', $page); // Adjust the pagination limit as necessary

        return response()->json([
            'bills' => $bills->items(), 
            'currentPage' => $bills->currentPage(),
            'lastPage' => $bills->lastPage(),
            'total' => $bills->total()
        ]);
    }

    public function getResidentsWithOverdues(Request $request, $page)
    {
        // Set the number of items per page (you can modify this as needed)
        $perPage = 10;

        // Get the search query from the request (if present)
        $searchQuery = $request->input('search', '');

        // Fetch residents with overdue bills, and optionally filter by the resident's name
        $residents = Resident::whereHas('bills', function ($query) {
            $query->where('status', 'overdue')
                ->where('due_date', '<', now()); // Ensure the bill's due date is in the past
        })
        ->with(['transactions', 'house','user', 'bills' => function ($query) {
            $query->where('status', 'overdue') // Only include overdue bills
                ->where('due_date', '<', now()); // Ensure the bill's due date is in the past
        }])
        ->whereHas('user', function ($query) use ($searchQuery) {
            // Search in the first name, middle name, or last name
            $query->where('firstname', 'like', "%{$searchQuery}%")
                ->orWhere('middlename', 'like', "%{$searchQuery}%")
                ->orWhere('lastname', 'like', "%{$searchQuery}%");
        })
        ->paginate($perPage);

        // Prepare the response with additional data (overdue months, number of months, total amount)
        $residentsWithOverdueDetails = $residents->map(function ($resident) {
            $overdueMonths = [];
            $totalAmount = 0;

            foreach ($resident->bills as $bill) {
                // Ensure due_date is a Carbon instance before calling format()
                $dueDate = Carbon::parse($bill->due_date); 
                $overdueMonth = $dueDate->format('Y-m'); // Get the year and month of the overdue bill
                if (!in_array($overdueMonth, $overdueMonths)) {
                    $overdueMonths[] = $overdueMonth; // Add unique months
                }
                $totalAmount += $bill->amount; // Sum the overdue bill amounts
            }

            return [
                'resident' => $resident,
                'overdueMonths' => $overdueMonths, // List of overdue months
                'numOverdueMonths' => count($overdueMonths), // Number of overdue months
                'totalAmount' => $totalAmount, // Total overdue amount
            ];
        });

        // Return the paginated results with the additional data
        return response()->json([
            'data' => $residentsWithOverdueDetails,
            'current_page' => $residents->currentPage(),
            'last_page' => $residents->lastPage(),
            'total' => $residents->total(),
        ]);
    }   

    public function notifyOverdueBills(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'bill_ids' => 'required|array',
            'bill_ids.*' => 'exists:bills,id', // Ensure each ID exists in the bills table
        ]);

        // Get the array of bill IDs from the request
        $billIds = $request->input('bill_ids');

        // Fetch the bills based on the provided IDs
        $bills = Bill::whereIn('id', $billIds)->get();

        foreach ($bills as $bill) {
            $user = $bill->resident->user;
            $residentEmail = $user->email;
            Mail::to($residentEmail)->send(new OverdueBillNotification($bill));
            $title = "Overdue Bill Notification";
            $message = "This is a reminder that your bill for the month of " . Carbon::parse($bill->issue_date)->format('F Y') . " is overdue.";
            PushNotificationHelper::sendToUser($user->id, $title, $message);
        }

        return response()->json(['message' => 'Notifications sent successfully']);
    }
    
    // get user billss
    public function getUserBills($resident_id)
    {
    // Find the current resident
    $resident = Resident::find($resident_id);

    if (!$resident) {
        return response()->json(['message' => 'Resident not found.'], 404);
    }

    // Check if the current resident is the homeowner
    $homeOwner = null;
    if ($resident->user->role_type === "home_owner") {
        $homeOwner = $resident;
    } else {
        // Find the homeowner sharing the same house
        $homeOwner = Resident::where('house_id', $resident->house_id)
            ->whereHas('user', function ($query) {
                $query->where('role_type', 'home_owner');
            })
            ->first();
    }

    if (!$homeOwner) {
        return response()->json(['message' => 'Homeowner not found.'], 404);
    }

        $bills = Bill::with('transactions')
            ->where('resident_id', $homeOwner->id)
            ->orderBy('due_date', 'desc')
            ->get()
            ->map(function ($bill) {
                // Calculate the total amount paid for this bill
                $totalPaid = $bill->transactions->sum('amount');

                // Calculate the balance
                $balance = $bill->amount - $totalPaid;

                // Add the balance to the bill object
                $bill->balance = $balance;

                return $bill;
            });

        // Calculate the total balance across all bills
        $totalBalance = $bills->sum('balance');

        return response()->json([
            'bills' => $bills,
            'total_balance' => $totalBalance
        ]);
    }

    // Store a newly created bill in storage
    public function store(Request $request)
    {
        $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'status' => 'required|in:paid,pending,overdue',
            'issue_date' => 'required|date',
        ]);

        $bill = Bill::create($request->all());

        return response()->json($bill, 201);
    }

    // Display the specified bill
    public function show($id)
    {
        $bill = Bill::with('resident', 'transactions')->findOrFail($id);
        return response()->json($bill);
    }

    // Update the specified bill in storage
    public function update(Request $request, $id)
    {
        $bill = Bill::findOrFail($id);

        $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'status' => 'required|in:paid,pending,overdue',
            'issue_date' => 'required|date',
        ]);

        $bill->update($request->all());

        return response()->json($bill);
    }

    public function countOverdueMontlhyDues(Request $request)
    {
        $month = $request->month;
        $year = $request->year;

        // Query to count distinct bills with unpaid bills in the given month and year
        $unpaidResidentsCount = Bill::where('status', 'pending')
            ->whereYear('due_date', $year)
            ->whereMonth('due_date', $month)
            ->select('resident_id')
            ->distinct()
            ->count();

        return response()->json(['unpaid_residents_count' => $unpaidResidentsCount]);
    }

    public function countOverdue()
    {
        // Query to count distinct residents with overdue bills
        $overdueBillsCount = Bill::whereIn('status', ['overdue', 'pending'])
            ->distinct()
            ->count();
        return response()->json(['overdue_bills_count' => $overdueBillsCount]);
    }

    public function topResidentsWithPendingBills()
{
    // Get the top 3 residents with the most overdue bills
    $topResidents = Resident::with(['user', 'house', 'bills' => function ($query) {
        $query->whereIn('status', ['pending']); // Filter for overdue bills
    }])
    ->withCount(['bills' => function ($query) {
        $query->whereIn('status', ['pending']); // Count only overdue bills
    }])
    ->having('bills_count', '>', 0) // Only residents with unpaid or overdue bills
    ->orderByDesc('bills_count') // Sort by the number of unpaid or overdue bills
    ->limit(20)
    ->get();

    // Check if data is found
    if ($topResidents->isEmpty()) {
        return response()->json(['message' => 'No residents with unpaid bills found'], 404);
    }

    // Return the result as a JSON response
    return response()->json($topResidents);
}

    

    // Remove the specified bill from storage
    public function destroy($id)
    {
        $bill = Bill::findOrFail($id);
        $bill->delete();

        return response()->json(['message' => 'Bill deleted successfully']);
    }

}