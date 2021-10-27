<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// user controller routes
Route::post("register", [UserController::class, "register"]);

Route::post("login", [UserController::class, "login"]);


Route::middleware('auth:sanctum')->group(function() {

	Route::get('/roles/all',['uses'=>'Roletypecontroller@getAllRoles']);
	Route::resource('roles', 'Roletypecontroller');

	Route::get('/producer/all',['uses'=>'ProducerController@getProducersAll']);
	Route::resource('producer', 'ProducerController');

	Route::get('/genre/all',['uses'=>'GenreController@getAllGenre']);
	Route::resource('genre', 'GenreController');

	Route::get('/actor/all',['uses'=>'ActorController@getActorsAll']);
	Route::resource('actor', 'ActorController');

	Route::post('/movie/{id}/update',['uses'=>'MovieController@update']);
	Route::get('/movie/getrole-actor',['uses'=>'MovieController@getRoleActor']);
	Route::get('/movie/all',['uses'=>'MovieController@getAllMovie']);
	Route::resource('movie', 'MovieController');
    Route::get("user", [UserController::class, "user"]);

    // Route::resource('tasks', TaskController::class);

});

// sanctum auth middleware routes
