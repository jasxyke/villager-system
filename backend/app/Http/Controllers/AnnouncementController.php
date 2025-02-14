<?php

namespace App\Http\Controllers;

use App\Helpers\PushNotificationHelper;
use App\Models\Announcement;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AnnouncementController extends Controller
{
    protected $imagesFolderName = "Announcement Images";
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $now = Carbon::now();
        $oneWeekAgo = (clone $now)->subWeek()->format('Y-m-d H:i');
        $threeWeekSoon = (clone $now)->addWeeks(3)->format('Y-m-d H:i');
    
        $perPage = 10; // Default to 10 items per page
    
        $announcements = Announcement::whereBetween('event_start_date', [$oneWeekAgo, $threeWeekSoon])
            ->orderBy('event_start_date', 'DESC')
            ->paginate($perPage);
    
        return response()->json($announcements);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnnouncementRequest $request)
    {
        $adminId = Admin::where('user_id', Auth::id())->first();

        // Initialize picture values as null
        $picturePath = null;
        $pictureUrl = null;

        // Check if the file exists before storing it
        if ($request->hasFile('announcementPic')) {
            $picturePath = $request->file('announcementPic')->store($this->imagesFolderName, 'public');
            $pictureUrl = Storage::disk('public')->url($picturePath);
        }

        $announcement = Announcement::create([
            'admin_id' => $adminId->id,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'picture_path' => $picturePath, // This will be null if no file is uploaded
            'picture_url' => $pictureUrl, // This will be null if no file is uploaded
            'event_start_date' => $request->input('eventStartDate'),
            'event_end_date' => $request->input('eventEndDate'),
            'event_start_time' => $request->input('eventStartTime'),
            'event_end_time' => $request->input('eventEndTime'),
        ]);

        PushNotificationHelper::sendToAll(
            $request->input('title'),
            $request->input('content')
        );

        return response()->json([
            'message' => 'Announced successfully!',
            'announcement' => $announcement,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $announcement = Announcement::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>'Announcement record not found.'
            ]);
        });

        return response()->json(['announcement'=>$announcement]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnnouncementRequest $request, string $id)
    {
        $announcement = Announcement::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>'Announcement record not found.'
            ]);
        });

        $announcement->title = $request->input('title');
        $announcement->content = $request->input('content');
        $announcement->event_start_date = $request->input('eventStartDate');
        $announcement->event_end_date = $request->input('eventEndDate');
        $announcement->event_start_time = $request->input('eventStartTime');
        $announcement->event_end_time = $request->input('eventEndTime');

        $announcement->save();

        return response()->json(['announcement'=>$announcement]);
    }

    public function updateAnnouncementImg(Request $request, string $id){
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg']);

        $path = $request->file('image')->store($this->imagesFolderName,'public');
        $url = Storage::disk('public')->url($path);

        $announcement = Announcement::findOr($id, function (){
            throw ValidationException::withMessages(['Cannot change iamge, announcement record not found.']);
        });

        if($announcement->picture_path !== null || $announcement->picture_path !== ""){
            Storage::delete($announcement->picture_path);
        }

        $announcement->picture_path = $path;
        $announcement->picture_url = $url;
        $announcement->save();

        return $url;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $announcement = Announcement::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>'Announcement data not found.'
            ]);
        });

        if($announcement->picture_path !== null || $announcement->picture_path !== ""){
            Storage::delete($announcement->picture_path);
        }

        $announcement->delete();

        return response()->json(['message'=>'Announcement successfuly deleted.']);
    }
}