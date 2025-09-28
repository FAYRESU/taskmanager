# Task Manager

โปรเจกต์ Task Manager เป็นแอปพลิเคชันสำหรับจัดการงาน (Task) ที่สร้างขึ้นด้วยเทคโนโลยีสมัยใหม่ เพื่อเป็นตัวอย่างการสร้าง Full-stack Application ที่มีประสิทธิภาพ

## ✨ คุณสมบัติเด่น

-   **Backend:** Laravel 12 (PHP 8.2)
-   **Frontend:** React (Vite)
-   **Styling:** Tailwind CSS
-   **Communication:** Inertia.js (ทำหน้าที่เป็นตัวกลางเชื่อม Laravel กับ React)
-   **CRUD Operations:** สร้าง, อ่าน, อัปเดต, และลบ Task ได้อย่างสมบูรณ์
-   **Filtering:** สามารถกรองรายการ Task ตามสถานะ (All, To Do, In Progress, Done) และประเภท (Task, Bug, Story)
-   **Real-time Feedback:** มีการแจ้งเตือน (Toast notifications) เมื่อมีการกระทำต่างๆ

---

## 🚀 การติดตั้งและใช้งาน (Getting Started)

ทำตามขั้นตอนต่อไปนี้เพื่อติดตั้งและรันโปรเจกต์บนเครื่องของคุณ

### สิ่งที่ต้องมี (Prerequisites)

-   PHP >= 8.2
-   Composer
-   Node.js & npm
-   Git
-   ฐานข้อมูล (เช่น MySQL, PostgreSQL)

### ขั้นตอนการติดตั้ง

1.  **Clone a repository:**

    ```bash
    git clone https://github.com/FAYRESU/taskmanager.git
    cd taskmanager
    git checkout feature/task-crud
    ```

2.  **ติดตั้ง Backend Dependencies:**

    ```bash
    composer install
    ```

3.  **ติดตั้ง Frontend Dependencies:**

    ```bash
    npm install
    ```

4.  **ตั้งค่า Environment:**
    คัดลอกไฟล์ `.env.example` ไปเป็น `.env`

    ```bash
    cp .env.example .env
    ```

5.  **สร้าง Application Key:**

    ```bash
    php artisan key:generate
    ```

6.  **ตั้งค่าฐานข้อมูล:**
    เปิดไฟล์ `.env` และแก้ไขค่า `DB_*` ให้ตรงกับการตั้งค่าฐานข้อมูลของคุณ

    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=taskmanager
    DB_USERNAME=root
    DB_PASSWORD=
    ```

7.  **Run Database Migrations:**
    เพื่อสร้างตารางในฐานข้อมูล
    ```bash
    php artisan migrate
    ```

### การรันโปรเจกต์

1.  **รัน Vite Development Server (สำหรับ Frontend):**

    ```bash
    npm run dev
    ```

2.  **รัน Laravel Development Server (สำหรับ Backend):**
    เปิด Terminal ใหม่ขึ้นมา แล้วรันคำสั่ง

    ```bash
    php artisan serve
    ```

3.  เปิดเบราว์เซอร์แล้วเข้าไปที่ `http://localhost:8000`

---

## 🏛️ สถาปัตยกรรมและ Design Patterns

โปรเจกต์นี้ถูกออกแบบโดยใช้ Design Pattern และหลักการที่เป็นที่ยอมรับในวงการ เพื่อให้โค้ดมีความเป็นระเบียบ, ง่ายต่อการบำรุงรักษา, และขยายความสามารถในอนาคต

### 1. Model-View-Controller (MVC)

เป็น Pattern หลักที่ Laravel ใช้ในการแบ่งแยกส่วนต่างๆ ของแอปพลิเคชัน

-   **Model:** (`app/Models/Task.php`)

    -   ทำหน้าที่จัดการข้อมูลและ Business Logic
    -   ในโปรเจกต์นี้ Model จะใช้ Eloquent ORM ซึ่งเป็น Implementation ของ **Active Record Pattern** ทำให้สามารถติดต่อกับฐานข้อมูลได้อย่างสะดวก (เช่น `Task::create()`, `Task::all()`)

-   **View:** (`resources/js/Pages/Tasks/Index.jsx` และ Components อื่นๆ)

    -   ทำหน้าที่แสดงผลข้อมูลให้ผู้ใช้เห็น (User Interface)
    -   โปรเจกต์นี้ใช้ React Components เป็น View ซึ่งช่วยให้สามารถสร้าง UI ที่ซับซ้อนและโต้ตอบกับผู้ใช้ได้ดี ผ่าน **Component-Based Architecture**

-   **Controller:** (`app/Http/Controllers/TaskController.php`)
    -   ทำหน้าที่เป็นตัวกลางรับ Request จากผู้ใช้, สั่งให้ Model จัดการข้อมูล, และส่งผลลัพธ์ที่ได้ไปให้ View แสดงผล
    -   จัดการ HTTP requests ทั้งหมดที่เกี่ยวกับ Task เช่น การแสดงผล, การสร้าง, การอัปเดต, และการลบ

### 2. Active Record Pattern

Eloquent ORM ของ Laravel เป็นการประยุกต์ใช้ Active Record Pattern โดยแต่ละ Model จะ map ตรงไปยังตารางในฐานข้อมูล ทำให้ Object หนึ่งตัวแทนแถวข้อมูลหนึ่งแถว ซึ่งช่วยให้การเขียนโค้ดจัดการข้อมูลง่ายและสั้นลง

### 3. Component-Based Architecture (CBA)

ในฝั่ง Frontend (React) เราใช้หลักการนี้ในการสร้าง UI โดยการแบ่งหน้าเว็บออกเป็นส่วนประกอบย่อยๆ (Components) ที่สามารถนำกลับมาใช้ใหม่ได้ เช่น `AddTaskForm.jsx`, `TaskItem.jsx` ทำให้โค้ดฝั่ง Frontend มีความเป็นระเบียบและจัดการได้ง่าย
