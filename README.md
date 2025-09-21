# Task Manager

A simple task manager application built with Laravel, React, Inertia.js, and Tailwind CSS.

## Features

- Create, Read, Update, and Delete tasks
- Mark tasks as completed
- Filter tasks by status (All, Completed, Pending)
- Toast notifications for CRUD operations

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-manager.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd task-manager
    ```
3.  Install PHP dependencies:
    ```bash
    composer install
    ```
4.  Install NPM dependencies:
    ```bash
    npm install
    ```
5.  Create a copy of the `.env.example` file and name it `.env`:
    ```bash
    cp .env.example .env
    ```
6.  Generate an application key:
    ```bash
    php artisan key:generate
    ```
7.  Configure your database credentials in the `.env` file.

8.  Run the database migrations:
    ```bash
    php artisan migrate
    ```

## Usage

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  In a separate terminal, start the PHP development server:
    ```bash
    php artisan serve
    ```
3.  Open your browser and navigate to `http://localhost:8000`.