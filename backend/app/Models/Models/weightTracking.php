<?php

namespace App\Models;

use App\Models\membre;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WeightTracking extends Model
{
    use HasFactory;

    protected $fillable = [
        'membre_id', 'weight', 'date', 'time'
    ];

    public function member()
    {
        return $this->belongsTo(membre::class, 'membre_id');
    }
}
