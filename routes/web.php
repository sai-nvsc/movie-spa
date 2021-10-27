<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',['uses'=>'HomeController@home'])->name('home');


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
