<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MacrosConsumed extends Model
{
    use HasFactory;

    protected $fillable = [
        'calories_user_id', 'proteins_consumed', 'fats_consumed', 'carbs_consumed', 'calories_consumed'
    ];

    public function caloriesUser()
    {
        return $this->belongsTo(CaloriesUser::class);
    }
}
