<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to User Dashboard']);
    }
}