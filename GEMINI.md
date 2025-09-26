# GEMINI.md

## Project Overview

This is a Laravel 12 project with a React frontend. It appears to be a fresh installation of the Laravel framework, intended to be used as a starting point for a web application.

*   **Backend:** PHP 8.2, Laravel 12
*   **Frontend:** React, Vite, Tailwind CSS
*   **Database:** The database schema includes a `users` table, suggesting user authentication is a core feature.

## Building and Running

### Backend

*   **Install Dependencies:** `composer install`
*   **Run Development Server:** `php artisan serve`
*   **Run Tests:** `php artisan test`

### Frontend

*   **Install Dependencies:** `npm install`
*   **Run Development Server:** `npm run dev`
*   **Build for Production:** `npm run build`

## Development Conventions

*   The project follows the standard Laravel directory structure and conventions.
*   Frontend assets are managed with Vite and located in the `resources` directory.
*   Database migrations are used to manage the database schema.
*   Tests are written with PHPUnit.
