<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaloriesUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'birthday', 'height', 'weight', 'goal', 'activity'
    ];

    public static function boot()
    {
        parent::boot();

        static::created(function ($caloriesUser) {
            $caloriesUser->macrosConsumed()->create([
                'proteins_consumed' => 0,
                'fats_consumed' => 0,
                'carbs_consumed' => 0,
                'calories_consumed' => 0,
            ]);
        });
    }

    public function macrosConsumed()
    {
        return $this->hasOne(MacrosConsumed::class);
    }

}
