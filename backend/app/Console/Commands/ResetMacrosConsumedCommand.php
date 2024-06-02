<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MacrosConsumed;

class ResetMacrosConsumedCommand extends Command
{
    protected $signature = 'macros:reset';
    protected $description = 'Reset macros consumed to zero';

    public function handle()
    {
        // Reset columns to zero for all records
        MacrosConsumed::query()->update([
            'proteins_consumed' => 0,
            'fats_consumed' => 0,
            'carbs_consumed' => 0,
            'calories_consumed' => 0,
        ]);

        $this->info('Macros consumed reset successfully.');
    }
}
