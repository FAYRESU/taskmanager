<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    public function index()
    {
        // แสดงหน้า Manager Dashboard
        return Inertia::render('Manager/Dashboard');
    }
}
