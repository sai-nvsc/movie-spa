<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roletype extends Model
{
    use HasFactory;
    protected $fillable=['roletype'];

    public function movies(){
        return $this->belongsToMany(Movie::class,'actor_roles_movies','role_id','movie_id')->withPivot('actor_id','character_name');
    }

    public function actors(){
        return $this->belongsToMany(Movie::class,'actor_roles_movies','role_id','actor_id')->withPivot('movie_id','character_name');
    }
}
