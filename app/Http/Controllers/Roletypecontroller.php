<?php

namespace App\Http\Controllers;

use App\Models\Roletype;
use Illuminate\Http\Request;

class Roletypecontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('roletypes.index');
    }

    public function getAllRoles(){
        $roles=Roletype::orderBy('created_at','DESC')->get();
        return response()->json($roles);
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
        $roles=Roletype::create($request->all());
        return response()->json($roles);
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
        $role=Roletype::find($id);
        return response()->json($role);
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
        $role=Roletype::find($id);
        $role=$role->update($request->all());
        $request->session()->flash('success', 'GENRE has been Updated!');
        return response()->json(["status"=>200, "data"=>$role]);

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
        $role=Roletype::findOrFail($id);
        $role->delete();
        return response()->json(["success" => "Deleted Successfully!",
        "data" => $role,"status" => 200]);
    }
}
