<?php
namespace App\Http\Controllers;

use App\Helpers\SettingsHelper;
use App\Models\Resident;
use Barryvdh\DomPDF\Facade\Pdf;
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
            $headerData = $this->getHeaderData();
    
            // Load the PDF view and pass grouped residents and header data
            $pdf = PDF::loadView('reports.resident_profile', compact('groupedResidents', 'headerData'));
    
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

    
    public function generateDuesPdf()
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

            $headerData = $this->getHeaderData();

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

    private function convertToBase64($path)
    {
        if (file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            return 'data:image/' . $type . ';base64,' . base64_encode($data);
        }
        return null;
    }

    private function getHeaderData()
    {
        // Convert village logo to Base64
        $villageLogoPath = public_path('storage/' . SettingsHelper::get('village_logo_path')); // Path to your village logo
        $cityLogoPath = public_path('storage/' . SettingsHelper::get('city_logo_path')); // Path to your city logo

        $villageLogoBase64 = $this->convertToBase64($villageLogoPath);
        $cityLogoBase64 = $this->convertToBase64($cityLogoPath);

        return [
            'villageName' => SettingsHelper::get('village_name'),
            'address' => SettingsHelper::get('village_address'),
            'phone1' => SettingsHelper::get('village_contact_number_1'),
            'phone2' => SettingsHelper::get('village_contact_number_2'),
            'email' => SettingsHelper::get('village_email'),
            'hoaRegNum' => SettingsHelper::get('village_hoa_reg_num'),
            'tinNum' => SettingsHelper::get('village_tin_no'),
            'villageLogo' => $villageLogoBase64,
            'cityLogo' => $cityLogoBase64,
        ];
    }
}