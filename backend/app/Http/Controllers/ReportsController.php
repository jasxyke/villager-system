<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReportsController extends Controller
{
    public function generatePdfReport()
{
    try {
        $residents = Resident::with('user', 'bills')
            ->whereHas('bills', function ($query) {
                $query->where('status', 'overdue');
            })
            ->get();

        if ($residents->isEmpty()) {
            return response()->json(['error' => 'No residents found with overdue bills'], 404);
        }

        $pdf = PDF::loadView('reports.overdue_bills', compact('residents')); // Pass residents here

        if (!$pdf) {
            return response()->json(['error' => 'PDF generation failed'], 500);
        }

        return $pdf->download('Resident_Bills_Report.pdf');
    } catch (\Exception $e) {
        // Log the error
        Log::error('PDF Generation Error: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred while generating the report: ' . $e->getMessage()], 500);
    }
}


    public function fetchResidentBillData()
    {
        // Fetch all residents with overdue bills
        $residents = Resident::with([
            'user:id,firstname,lastname', // Only fetch relevant fields
            'house:id,block,lot',
            'bills' => function ($query) {
                $query->where('status', 'overdue')
                      ->select('resident_id', 'amount', 'due_date');
            }
        ])
        ->whereHas('bills', function ($query) {
            $query->where('status', 'overdue');
        })
        ->get(['id', 'user_id', 'house_id']); // Only fetch necessary fields for residents

        // Map resident data to include months behind and total overdue amount
        $residentData = $residents->map(function ($resident) {
            $monthsBehind = $resident->bills->count();
            $totalAmount = $resident->bills->sum('amount');
            
            return [
                'name' => "{$resident->user->firstname} {$resident->user->lastname}",
                'address' => "Block {$resident->house->block} Lot {$resident->house->lot}",
                'monthsBehind' => $monthsBehind,
                'amount' => $totalAmount,
            ];
        });

        // Sort by months behind in descending order
        $residentData = $residentData->sortByDesc('monthsBehind')->take(20);

        return response()->json([
            'residents' => $residentData->values(), // Reset the array keys
        ]);
    }
}