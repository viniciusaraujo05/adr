<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('secret-mission');
})->name('home');

Route::get('/task-1', function () {
    return Inertia::render('task-1');
})->name('task-1');

Route::get('/secret-mission', function () {
    return Inertia::render('secret-mission');
})->name('secret-mission');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
