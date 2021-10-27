<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actor_roles_movies', function (Blueprint $table) {
            $table->id();
            $table->integer('movie_id');
            $table->integer('actor_id');
            $table->integer('role_id');
            $table->string('character_name');
            $table->timestamps();
        });

        Schema::create('genres_movies', function (Blueprint $table) {
            $table->id();
            $table->integer('genre_id');
            $table->integer('movie_id');
        });

        Schema::create('movies_producers', function (Blueprint $table) {
            $table->id();
            $table->integer('movie_id');
            $table->integer('producer_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('actor_roles_movies');
        Schema::dropIfExists('genres_movies');
        Schema::dropIfExists('movies_producers');
    }
}
