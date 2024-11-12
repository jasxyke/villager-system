<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Resident;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\OverdueBillNotification;
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

    public function getOverdueBills(string $page)
    {
        // Create a query for bills
        $query = Bill::with(['resident.user']) // Eager load Resident and User relationships
            ->where('status', 'overdue');  // Filter for overdue bills

        // Order by the oldest due date
        $bills = $query->orderBy('due_date', 'asc')
            ->paginate(10, ['*'], 'page', $page); // Adjust the pagination limit as necessary

        return response()->json($bills);
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
            $residentEmail = $bill->resident->user->email;
            Mail::to($residentEmail)->send(new OverdueBillNotification($bill));
        }

        return response()->json(['message' => 'Notifications sent successfully']);
    }
    
    // get user billss
    public function getUserBills($resident_id)
    {
        $bills = Bill::with('transactions')
            ->where('resident_id', $resident_id)
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

    public function countUnpaidResidents(Request $request)
    {
        $month = $request->month;
        $year = $request->year;

        // Query to count distinct residents with unpaid bills in the given month and year
        $unpaidResidentsCount = Bill::where('status', 'pending')
            ->whereYear('due_date', $year)
            ->whereMonth('due_date', $month)
            ->select('resident_id')
            ->distinct()
            ->count();

        return response()->json(['unpaid_residents_count' => $unpaidResidentsCount]);
    }

    public function countOverdueResidents()
    {
        // Query to count distinct residents with overdue bills
        $overdueResidentsCount = Bill::where('status', 'overdue')
            ->select('resident_id')
            ->distinct()
            ->count();

        return response()->json(['overdue_residents_count' => $overdueResidentsCount]);
    }

    public function topResidentsWithUnpaidBills()
{
    // Get the top 3 residents with the most unpaid or overdue bills
    $topResidents = Resident::with(['user', 'house', 'bills' => function ($query) {
        $query->whereIn('status', ['pending', 'overdue']); // Filter for unpaid or overdue bills
    }])
    ->withCount(['bills' => function ($query) {
        $query->whereIn('status', ['pending', 'overdue']); // Count only unpaid or overdue bills
    }])
    ->having('bills_count', '>', 0) // Only residents with unpaid or overdue bills
    ->orderByDesc('bills_count') // Sort by the number of unpaid or overdue bills
    ->limit(3) // Limit to top 3 residents
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