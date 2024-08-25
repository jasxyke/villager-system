<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use App\Http\Requests\StoreAmenityRequest;
use App\Http\Requests\UpdateAmenityRequest;

class AmenityController extends Controller
{
    public function index()
    {
        $amenities = Amenity::all();
        return response()->json($amenities);
    }

    public function store(StoreAmenityRequest $request)
    {
        $validated = $request->validated();
        $amenity = Amenity::create($validated);
        return response()->json($amenity, 201);
    }

    public function show(Amenity $amenity)
    {
        return response()->json($amenity);
    }

    public function update(UpdateAmenityRequest $request, string $id)
    {
        $validated = $request->validated();
        $amenity = Amenity::findOrFail($id);
        $amenity->update($validated);
        return response()->json($amenity);
    }

    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
        return response()->json(null, 204);
    }
}
