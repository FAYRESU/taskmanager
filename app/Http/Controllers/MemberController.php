<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        // แสดงหน้า Member Tasks
        return Inertia::render('Member/Tasks');
    }
}
