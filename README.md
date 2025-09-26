แน่นอนครับ! ด้านล่างนี้คือเอกสาร **ฉบับปรับปรุง** พร้อมหัวข้อ **Authentication (Laravel)** ที่คุณต้องการเพิ่ม:

---

# Task Manager

โปรเจกต์ Task Manager เป็นแอปพลิเคชันสำหรับจัดการงาน (Task) ที่สร้างขึ้นด้วยเทคโนโลยีสมัยใหม่ เพื่อเป็นตัวอย่างการสร้าง Full-stack Application ที่มีประสิทธิภาพ

## ✨ คุณสมบัติเด่น

* **Backend:** Laravel 12 (PHP 8.2)
* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Communication:** Inertia.js (ทำหน้าที่เป็นตัวกลางเชื่อม Laravel กับ React)
* **CRUD Operations:** สร้าง, อ่าน, อัปเดต, และลบ Task ได้อย่างสมบูรณ์
* **Filtering:** กรองรายการ Task ตามสถานะ (All, To Do, In Progress, Done) และประเภท (Task, Bug, Story)
* **Authentication:** ระบบลงทะเบียน, เข้าสู่ระบบ, รีเซ็ตรหัสผ่าน พร้อม middleware ป้องกันหน้า Dashboard และ Tasks
* **Real-time Feedback:** มีการแจ้งเตือน (Toast notifications) เมื่อมีการกระทำต่างๆ

---

## 🚀 การติดตั้งและใช้งาน (Getting Started)

### ✅ สิ่งที่ต้องมี (Prerequisites)

* PHP >= 8.2
* Composer
* Node.js & npm
* Git
* ฐานข้อมูล (MySQL, PostgreSQL เป็นต้น)

---

### ⚙️ ขั้นตอนการติดตั้ง

1. **Clone repository:**

   ```bash
   git clone https://github.com/FAYRESU/taskmanager.git
   cd taskmanager
   git checkout feature/task-crud-auth
   ```

2. **ติดตั้ง Backend Dependencies:**

   ```bash
   composer install
   ```

3. **ติดตั้ง Frontend Dependencies:**

   ```bash
   npm install
   ```

4. **ตั้งค่า Environment:**

   ```bash
   cp .env.example .env
   ```

5. **สร้าง Application Key:**

   ```bash
   php artisan key:generate
   ```

6. **ตั้งค่าฐานข้อมูลใน `.env`:**

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=taskmanager
   DB_USERNAME=root
   DB_PASSWORD=
   ```

7. **Run Database Migrations:**

   ```bash
   php artisan migrate
   ```

---

### 🧪 รันโปรเจกต์

1. **รัน Vite (Frontend):**

   ```bash
   npm run dev
   ```

2. **รัน Laravel (Backend):**

   ```bash
   php artisan serve
   ```

3. เข้าสู่ระบบที่ `http://localhost:8000`

---

## 🔐 Authentication (Laravel)

ระบบนี้ใช้ความสามารถ Authentication ของ Laravel ร่วมกับ Laravel Breeze + Inertia.js สำหรับ React

### ✅ ความสามารถ

* ลงทะเบียน (Register)
* เข้าสู่ระบบ (Login)
* รีเซ็ตรหัสผ่านผ่านอีเมล (Forgot / Reset Password)
* การป้องกันหน้าที่ต้องเข้าสู่ระบบ เช่น `/dashboard`, `/tasks`
* รองรับการเรียกใช้งาน API Authentication ผ่าน **Laravel Sanctum** *(optional)*

### 🔧 การติดตั้ง Authentication

1. ติดตั้ง Breeze:

   ```bash
   composer require laravel/breeze --dev
   php artisan breeze:install react
   ```

2. ติดตั้ง dependencies:

   ```bash
   npm install && npm run dev
   ```

3. รัน migration:

   ```bash
   php artisan migrate
   ```

4. เสร็จแล้วจะมี route ที่เกี่ยวข้องกับ Auth ดังนี้:

   * `/login`
   * `/register`
   * `/forgot-password`
   * `/reset-password`
   * `/dashboard`

5. ตรวจสอบ middleware:

   ```php
   // web.php
   Route::middleware(['auth'])->group(function () {
       Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
       Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
   });
   ```

---

## 🏛️ สถาปัตยกรรมและ Design Patterns

### 1. **Model-View-Controller (MVC)**

* **Model:** `app/Models/Task.php` (ใช้ Eloquent ORM)
* **View:** React Pages + Components
* **Controller:** `TaskController` จัดการ logic และประสานงานกับ Model และ View

### 2. **Active Record Pattern**

* `Task::create()`, `Task::where()` คือการประยุกต์ใช้ Active Record Pattern

### 3. **Component-Based Architecture (CBA)**

* UI React ถูกจัดเป็น Component ย่อย เช่น `AddTaskForm`, `TaskItem`

