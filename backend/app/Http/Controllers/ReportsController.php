<?php
namespace App\Http\Controllers;

use App\Helpers\HeaderHelper;
use App\Helpers\SettingsHelper;
use App\Models\Complaint;
use App\Models\Resident;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportsController extends Controller
{
    public function generateResidentProfilePdf()
    {
        try {
            // Fetch all residents with their associated user and house details
            $residents = Resident::with('user', 'house')->get();
    
            if ($residents->isEmpty()) {
                return response()->json(['error' => 'No residents found'], 404);
            }
    
            // Sort the residents by block and lot
            $residents = $residents->sortBy(function ($resident) {
                return (int) $resident->house->block * 10000 + (int) $resident->house->lot;
            });
    
            // Group residents by house_id
            $groupedResidents = $residents->groupBy('house_id')->map(function ($residentsInHouse) {
                $house = $residentsInHouse->first()->house; // Get house details (block, lot)
                return [
                    'house' => $house,
                    'residents' => $residentsInHouse,
                ];
            });
    
            // Fetch header data for the PDF
            $headerData = HeaderHelper::getHeaderData();
    
            // Load the PDF view and pass grouped residents and header data
            $pdf = PDF::loadView('reports.resident_profile', compact('groupedResidents', 'headerData'))
                                ->setPaper('a4', 'landscape');
    
            if (!$pdf) {
                return response()->json(['error' => 'PDF generation failed'], 500);
            }
    
            return $pdf->download('Resident_Profile_Report.pdf');
        } catch (\Exception $e) {
            Log::error('PDF Generation Error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while generating the report: ' . $e->getMessage()], 500);
        }
    }
    

    /**
     * Fetch resident profile data.
     */
    public function generateResidentProfileData()
    {
        $residents = Resident::with([
            'user:id,firstname,lastname', 
            'house:id,block,lot'
        ])->get(['id', 'user_id', 'house_id',
        'birthdate', 'sex', 'civil_status',
        'occupation_status', 'fb_name']); 

        $residentData = $residents->map(function ($resident) {
            return [
                'name' => "{$resident->user->firstname} {$resident->user->lastname}",
                'address' => "Block {$resident->house->block} Lot {$resident->house->lot}",
                'birthdate' => $resident->birthdate,//->format('F d, Y')
                'sex' => ucfirst($resident->sex),
                'civil_status' => ucfirst($resident->civil_status),
                'occupation_status' => ucfirst($resident->occupation_status),
                'fb_name' => $resident->fb_name,
            ];
        });

        return response()->json([
            'residents' => $residentData,
        ]);
    }

    
    public function generateDuesPdf(Request $request)
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


            $headerData = HeaderHelper::getHeaderData();

            $pdf = Pdf::loadView('reports.overdue_bills', compact('residents', 'headerData'));

            if (!$pdf) {
                return response()->json(['error' => 'PDF generation failed'], 500);
            }

            return $pdf->download('Resident_Bills_Report.pdf');
        } catch (\Exception $e) {
            Log::error('PDF Generation Error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while generating the report: ' . $e->getMessage()], 500);
        }
    }

    public function generateDuesData()
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

    public function generateComplaintsPdf()
    {
        try {
            // Fetch all complaints with resident details
            $complaints = Complaint::with('resident.user', 'resident.house')->get();

            if ($complaints->isEmpty()) {
                return response()->json(['error' => 'No complaints found'], 404);
            }

            // Group complaints by their status (Pending/Solved)
            $groupedComplaints = $complaints->groupBy('status');

            // Fetch header data for the PDF
            $headerData = HeaderHelper::getHeaderData();

            // Load the PDF view and pass the grouped complaints and header data
            $pdf = PDF::loadView('reports.complaints_report', compact('groupedComplaints', 'headerData'))
                            ->setPaper('a4', 'portrait');

            if (!$pdf) {
                return response()->json(['error' => 'PDF generation failed'], 500);
            }

            return $pdf->download('Complaints_Report.pdf');
        } catch (\Exception $e) {
            Log::error('PDF Generation Error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while generating the report: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Fetch complaints data for display
     */
    public function generateComplaintsData()
    {
        $complaints = Complaint::with([
            'resident:id,user_id,house_id',
            'resident.user',
            'resident.house:id,block,lot'
        ])->get(['id', 'resident_id', 'status', 'type', 'date_sent', 'message', 'remarks']);

        $complaintsData = $complaints->map(function ($complaint) {
            return [
                'resident' => $complaint->resident,
                'address' => "Block {$complaint->resident->house->block} Lot {$complaint->resident->house->lot}",
                'status' => ucfirst($complaint->status),
                'type' => ucfirst($complaint->type),
                'date_sent' => Carbon::parse($complaint->date_sent)->format('F d, Y'),
                'message' => $complaint->message,
                'remarks' => $complaint->remarks ?? 'N/A',
            ];
        });

        return response()->json([
            'complaints' => $complaintsData,
        ]);
    }

}