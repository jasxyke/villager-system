<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Resident;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
        $status = $request->query('status', 'pending'); // Default to 'pending' if not provided
    
        // Get the page number from the request or default to 1
        $page = $request->query('page', 1);
    
        // Get the month and year from the request
        $month = $request->query('month');
        $year = $request->query('year');
    
        // Get the search term for homeowner's name, default to an empty string if not provided
        $search = $request->query('search', '');
    
        // Build the query
        $query = Bill::with('resident.user', 'transactions')
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

    // Remove the specified bill from storage
    public function destroy($id)
    {
        $bill = Bill::findOrFail($id);
        $bill->delete();

        return response()->json(['message' => 'Bill deleted successfully']);
    }

    // Generate bills for all residents every month
    public function generateMonthlyBills()
    {
        $residents = Resident::all();
        $now = Carbon::now();

        DB::transaction(function () use ($residents, $now) {
            foreach ($residents as $resident) {
                Bill::create([
                    'resident_id' => $resident->id,
                    'amount' => 1000, // Replace with your logic to calculate the amount
                    'due_date' => $now->copy()->endOfMonth(),
                    'status' => 'pending',
                    'issue_date' => $now->copy()->startOfMonth(),
                ]);
            }
        });

        return response()->json(['message' => 'Monthly bills generated successfully']);
    }
}
