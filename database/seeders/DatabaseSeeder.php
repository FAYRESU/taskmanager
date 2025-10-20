<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // เรียก Seeder อื่น ๆ ที่ต้องการให้รัน
        $this->call([
            RoleUserSeeder::class, // ✅ เพิ่มบรรทัดนี้
        ]);
    }
}
