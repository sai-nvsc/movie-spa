<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;
    protected $fillable = ['actor_fullname', 'actor_notes'];


    public function movies(){
        return $this->belongsToMany(Movie::class, 'actor_roles_movies','actor_id','movie_id')->withPivot('role_id','character_name');
    }

    public function roletypes(){
        return $this->belongsToMany(Roletype::class,'actor_roles_movies','actor_id','role_id')->withPivot('movie_id','character_name');
    }
}
