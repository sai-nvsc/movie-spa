<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    use HasFactory;
    protected $fillable=['producer_name', 'email', 'website'];

    public function movies(){
        return $this->belongsToMany(Movie::class,'movies_producers','producer_id','movie_id');
    }
}
