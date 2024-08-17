<?php

namespace App\Http\Controllers;

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
    public function index()
    {
        $now = Carbon::now();
        $oneWeekAgo = $now->subWeek()->format('Y-m-d H:i');
        $threeWeekSoon = $now->addWeek()->addWeek()->addWeek()->addWeek()->format('Y-m-d H:i');

        $announcements = Announcement::whereBetween(
                        'event_date_time', [$oneWeekAgo, $threeWeekSoon])
                        ->orderBy('event_date_time', 'DESC')
                        ->get();
        
        return $announcements;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnnouncementRequest $request)
    {
        $picturePath = $request->file('announcementPic')->store($this->imagesFolderName,'public');
        $pictureUrl = Storage::disk('public')->url($picturePath);

        $adminId = Admin::where('user_id',Auth::id())->first();
        
        $announcement = Announcement::create([
            'admin_id'=>$adminId->id,
            'title'=>$request->input('title'),
            'content'=>$request->input('content'),
            'picture_path'=>$picturePath,
            'picture_url'=>$pictureUrl,
            'event_date_time'=>$request->input('eventDateTime'),
            'type'=>$request->type
        ]);
        return response()->json(['message'=>'Announced successfuly!',
                            'announcement'=>$announcement]);
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
        $announcement->event_date_time = $request->input('eventDateTime');

        $announcement->save();

        return response()->json(['announcement'=>$announcement]);
    }

    public function updateAnnouncementImg(Request $request, string $id){
        $request->validate(['announcement_img' => 'required|image|mimes:jpeg,png,jpg']);

        $path = $request->file('announcement_img')->store($this->imagesFolderName,'public');
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
