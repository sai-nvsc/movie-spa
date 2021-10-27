<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable=['title','synopsis','released_date','film_duration','image'];

    public function genres(){
        return $this->belongsToMany(Genre::class,'genres_movies','movie_id','genre_id');
    }

    public function actors(){
        return $this->belongsToMany(Actor::class,'actor_roles_movies','movie_id','actor_id')->withPivot('role_id','character_name');
    }

    public function producers(){
        return $this->belongsToMany(Producer::class,'movies_producers','movie_id','producer_id');
    }

    public function roletypes(){
        return $this->belongsToMany(Roletype::class,'actor_roles_movies','movie_id','role_id')->withPivot('actor_id','character_name');
    }
}
