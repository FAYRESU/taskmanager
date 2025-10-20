<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;
use Closure;

class PreventRequestsDuringMaintenance extends Middleware
{
    // ใช้ค่า default ของ Laravel
}
