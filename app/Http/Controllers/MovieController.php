<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Genre;
use App\Models\Movie;
use App\Models\Producer;
use App\Models\Roletype;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // $user=Auth::user();
        // if(!is_null($user)){
             return view('movies.index');
        // }
    }

    public function getAllMovie(){
        $movie=Movie::orderBy('created_at','DESC')->get();
        return response()->json($movie);
    }

    public function getRoleActor(){
        $movie['actor']=Actor::all();
        $movie['roles']=Roletype::all();
        return response()->json($movie);
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
        //transfer file to image folder
        $poster=$request->file('poster');
        $new_name=rand().'.'.$poster->getClientOriginalExtension();
        $poster->move(public_path("images"),$new_name);

        //store with photo to movie tables
        $movie=new Movie;
        $movie->title=$request->input('title');
        $movie->image=$new_name;
        $movie->synopsis=$request->input('synopsis');
        $movie->released_date=$request->input('released_date');
        $movie->film_duration=$request->input('film_duration');
        $movie->save();

        //get last id and store it to a variable
        foreach(array_unique($request->genre_id) as $genre_id){
            DB::table('genres_movies')->insert([
                'genre_id'=>$genre_id,
                'movie_id'=>$movie->id
            ]);
        }

        foreach(array_unique($request->producer_id) as $producer_id){
            DB::table('movies_producers')->insert([
                'producer_id'=>$producer_id,
                'movie_id'=>$movie->id
            ]);
        }

        for($i=0;$i<count($request->character_name);$i++){
            DB::table('actor_roles_movies')->insert([
                'movie_id'=>$movie->id,
                'actor_id'=>$request->actor_id[$i],
                'role_id'=>$request->role_id[$i],
                'character_name'=>$request->character_name[$i]

            ]);
        }

        return response()->json($movie);
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


        $movie['movies']=Movie::with(['actors','genres','roletypes','producers'])->find($id);
        $movie['genre']=Genre::all();
        $movie['actor']=Actor::all();
        $movie['producer']=Producer::all();
        $movie['roletype']=Roletype::all();

        return response()->json($movie);
        // foreach($movie['movies']['producers'] as $producer){
        //     echo $producer['pivot']['producer_id'];
        // };
        // // dd($movie['main']);
        // return response()->json($movie);
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
        $movie = Movie::find($id);
        $movie->title=request('title');
        $movie->synopsis=$request->input('synopsis');
        $movie->released_date=$request->input('released_date');
        $movie->film_duration=$request->input('film_duration');
        // $movie->save();

        //Poster Can be nullable in edit because user can choose whether to change the current poster of movie
        if($request->file('poster')!=null){
            $poster=$request->file('poster');
            $new_name=rand().'.'.$poster->getClientOriginalExtension();
            $poster->move(public_path("images"),$new_name);
            $movie->image=$new_name;
        }
         $movie->save();

        //Remove Entry from ralated tables--PIVOT TABLES
        $movie->genres()->wherePivot('movie_id','=',$id)->detach();
        $movie->actors()->wherePivot('movie_id','=',$id)->detach();
        $movie->producers()->wherePivot('movie_id','=',$id)->detach();

        //Reinsert to update the pivot Tables
        foreach(array_unique($request->genre_id) as $genre_id){
            DB::table('genres_movies')->insert([
                'genre_id'=>$genre_id,
                'movie_id'=>$movie->id
            ]);
        }

        foreach(array_unique($request->producer_id) as $producer_id){
            DB::table('movies_producers')->insert([
                'producer_id'=>$producer_id,
                'movie_id'=>$movie->id
            ]);
        }

        for($i=0;$i<count($request->character_name);$i++){
            DB::table('actor_roles_movies')->insert([
                'movie_id'=>$movie->id,
                'actor_id'=>$request->actor_id[$i],
                'role_id'=>$request->role_id[$i],
                'character_name'=>$request->character_name[$i]

            ]);
        }

        return response()->json($movie);

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
        $movie=Movie::findOrFail($id);
        $movie->delete();
        return response()->json(["success" => "Deleted Successfully!",
        "data" => $movie,"status" => 200]);
    }
}
