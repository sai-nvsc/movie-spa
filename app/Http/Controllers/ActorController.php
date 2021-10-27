<?php

namespace App\Http\Controllers;
use App\Models\Actor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // $actors=Actor::orderBy('created_at','DESC')->get();
        return View::make('actors.index');
    }

    public function getActorsAll(Request $request){

            $actors = Actor::orderBy('created_at','DESC')->get();
            return response()->json($actors);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $actors=Actor::create($request->all());
        // $request->session()->flash('success', 'Record has been Added!');
        return response()->json($actors);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $actor=Actor::find($id);

        return response()->json($actor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        // if($request->ajax()){
            $actor=Actor::find($id);
            $actor=$actor->update($request->all());
            // $request->session()->flash('success', 'Record has been Updated!');
            return response()->json($actor);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $actor=Actor::findOrFail($id);
        dd($actor);
        $actor->delete();
        return response()->json(["success" => "Deleted Successfully!",
        "data" => $actor,"status" => 200]);

    }
}
