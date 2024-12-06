<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the expenses.
     */
    public function getExpenses(Request $request)
    {
        // Get year and month filters
        $year = $request->input('year');
        $month = $request->input('month');
        $search = $request->input('search');

        // Query expenses
        $query = Expense::query();

        // Filter by year and month
        if ($year) {
            $query->whereYear('expenses_date', $year);
        }
        if ($month) {
            $query->whereMonth('expenses_date', $month);
        }

        // Optional: Search filter by name or OR number
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('expense_name', 'like', '%' . $search . '%')
                ->orWhere('or_number', 'like', '%' . $search . '%');
            });
        }

        // Calculate total expenses
        $totalExpenses = $query->sum('amount');

        // Paginate results
        $expenses = $query->orderBy('expenses_date', 'desc')->paginate(10);

        // Append total expenses to the response
        $response = [
            'expenses' => $expenses,
            'total_expenses' => $totalExpenses,
        ];

        return response()->json($response, 200);
    }


    /**
     * Store a newly created expense in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validatedData = $request->validate([
            'expense_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'expenses_date' => 'required|date',
            'or_date' => 'nullable|date',
            'or_number' => 'nullable|string|max:255',
        ]);

        // Create the expense
        $expense = Expense::create($validatedData);

        return response()->json(['message' => 'Expense created successfully.', 'data' => $expense], 201);
    }

    /**
     * Display the specified expense.
     */
    public function show($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found.'], 404);
        }

        return response()->json($expense, 200);
    }

    /**
     * Update the specified expense in storage.
     */
    public function update(Request $request, $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found.'], 404);
        }

        // Validate input
        $validatedData = $request->validate([
            'expense_name' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric|min:0',
            'expenses_date' => 'sometimes|required|date',
            'or_date' => 'sometimes|required|date',
            'or_number' => 'sometimes|required|string|max:255',
        ]);

        // Update the expense
        $expense->update($validatedData);

        return response()->json(['message' => 'Expense updated successfully.', 'data' => $expense], 200);
    }

    /**
     * Remove the specified expense from storage.
     */
    public function destroy($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found.'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully.'], 200);
    }
}