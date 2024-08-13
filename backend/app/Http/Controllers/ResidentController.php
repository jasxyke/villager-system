<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Http\Requests\StoreResidentRequest;
use App\Http\Requests\UpdateResidentRequest;
use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Resident::with('user')->paginate(20);
        return User::where('role_type','=','resident')->with('resident','resident.house')->paginate(20);
    }

    public function getResidentsPerBlock(Request $request, string $blockNumber){
        // $users = User::with('resident','resident.house')
        //     ->where('role_type','=','resident')
        //     ->whereRelation('resident.house','block','=',$blockNumber)
        //     ->orderBy('lastname','asc')
        //     ->paginate(20);
        //kapag ready na yung pagination, uncomment mo na yung nasa taas
        $users = User::with('resident','resident.house')
        ->where('role_type','=','resident')
        ->whereRelation('resident.house','block','=',$blockNumber)
        // ->orderBy('lastname','asc')
        ->paginate(20);
        // ->take(20)->get();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResidentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Resident $resident)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resident $resident)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResidentRequest $request, Resident $resident)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resident $resident)
    {
        //
    }
}