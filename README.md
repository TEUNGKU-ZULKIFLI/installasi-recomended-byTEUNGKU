# SEBELUM MENGIKUTI APA YANG ADA DI REPO INI, PERLU DIKETAHUI HAL-HAL DASAR BERIKUT:
## 1. MENGHIDUPKAN DOCKER DESKTOP
Jika menggunakan Docker sebagai basis pemrosesan, pastikan Docker Desktop sudah aktif. Kalau Docker tidak dihidupkan, semua layanan tidak akan berjalan.

**Langkah:** Hidupkan Docker Desktop, kemudian buka command line dari folder Laradock untuk menjalankan service terkait.
<div align="center">
    <img src="asset/OPEN_LARADOCK.gif" width="1000px"/>
</div>

## 2. MASUK KE DALAM WORKSPACE
Ini penting karena semua perintah atau file (misalnya `.php`) perlu dibuat dan dijalankan dari dalam container workspace.

**Langkah:** Jalankan `docker-compose exec workspace bash` atau perintah lain sesuai instruksi di project untuk mengakses workspace.
<div align="center">
    <img src="asset/IN_WORKSPACE.gif" width="1000px"/>
</div>

## 3. MEMBUKA PROJECT LARAVEL DI FILE EXPLORER + CMD/POWERSHELL
Agar memudahkan dalam editing file, buka folder project Laravel di VS Code atau editor pilihan. 

**Langkah:** Gunakan file explorer untuk membuka project dan akses terminal melalui CMD atau PowerShell agar dapat menjalankan perintah-perintah Laravel.
<div align="center">
    <img src="asset/OPEN_VSCode_CMD.gif" width="1000px"/>
</div>

## 4. COMMAND PHP ARTISAN
Berikut adalah daftar lengkap perintah `php artisan` di Laravel, termasuk command yang mungkin jarang digunakan tetapi tersedia di Laravel versi terbaru, termasuk Laravel 11:

### **Basic Commands**
1.**Menampilkan semua perintah Artisan.**
```bash
php artisan list
```
2.**Menampilkan bantuan detail untuk command tertentu.**
```bash
php artisan help <command>
```

### **Application**
1.**Menampilkan lingkungan aplikasi saat ini.**
```bash
php artisan env
```
2.**Menampilkan kutipan motivasi.**
```bash
php artisan inspire
```
3.**Menjalankan server pengembangan.**
```bash
php artisan serve
```

### **Cache**
1.**Menghapus semua cache aplikasi.**
```bash
php artisan cache:clear
```
2.**Menghapus cache tertentu.**
```bash
php artisan cache:forget <key>
```
3.**Membuat tabel untuk cache database.**
```bash
php artisan cache:table
```
4.**Meng-cache konfigurasi.**
```bash
php artisan config:cache
```
5.**Menghapus cache konfigurasi.**
```bash
php artisan config:clear
```
6.**Meng-cache semua route aplikasi.**
```bash
php artisan route:cache
```
7.**Menghapus cache route.**
```bash
php artisan route:clear
```
8.**Meng-cache semua view aplikasi.**
```bash
php artisan view:cache
```
9.**Menghapus cache view.**
```bash
php artisan view:clear
```

### **Database**
1.**Menghapus semua data dari database.**
```bash
php artisan db:wipe
```
2.**Menjalankan semua migrasi.**
```bash
php artisan migrate
```
3.**Membuat tabel migration di database.**
```bash
php artisan migrate:install
```
4.**Mengembalikan dan menjalankan ulang semua migrasi.**
```bash
php artisan migrate:refresh
```
5.**Mengembalikan semua migrasi.**
```bash
php artisan migrate:reset
```
6.**Mengembalikan migrasi terakhir.**
```bash
php artisan migrate:rollback
```
7.**Menampilkan status semua migrasi.**
```bash
php artisan migrate:status
```
8.**Membuat file migrasi baru.**
```bash
php artisan make:migration <name>
```
9.**Menjalankan semua seeder.**
```bash
php artisan db:seed
```
10.**Menjalankan seeder tertentu.**
```bash
php artisan db:seed --class=<SeederName>
```
11.**Membuat file seeder baru.**
```bash
php artisan make:seeder <name>
```
12.**Membuat factory baru untuk pengujian.**
```bash
php artisan make:factory <name>
```

### **Events and Listeners**
1.**Menghasilkan event dan listener yang diperlukan.**
```bash
php artisan event:generate
```
2.**Membuat event baru.**
```bash
php artisan make:event <name>
```
3.**Membuat listener baru.**
```bash
php artisan make:listener <name>
```

### **Jobs and Queues**
1.**Membuat job baru.**
```bash
php artisan make:job <name>
```
2.**Menjalankan queue yang sedang antre.**
```bash
php artisan queue:work
```
3.**Me-restart proses queue.**
```bash
php artisan queue:restart
```
4.**Mencoba ulang job tertentu.**
```bash
php artisan queue:retry <id>
```
5.**Membuat tabel queue di database.**
```bash
php artisan queue:table
```
6.**Menghapus semua job queue yang gagal.**
```bash
php artisan queue:flush
```

### **Logging and Debugging**
1.**Menghapus semua log aplikasi (tergantung package).**
```bash
php artisan logs:clear
```
2.**Menjalankan server debug dump.**
```bash
php artisan dump-server
```

### **Maintenance Mode**
1.**Mengaktifkan mode pemeliharaan.**
```bash
php artisan down
```
2.**Mengembalikan dari mode pemeliharaan.**
```bash
php artisan up
```

### **Make Commands (Generators)**
1.**Membuat model baru.**
```bash
php artisan make:model <name>
```
2.**Membuat controller baru.**
```bash
php artisan make:controller <name>
```
3.**Membuat command artisan baru.**
```bash
php artisan make:command <name>
```
4.**Membuat middleware baru.**
```bash
php artisan make:middleware <name>
```
5.**Membuat policy baru untuk otorisasi.**
```bash
php artisan make:policy <name>
```
6.**Membuat service provider baru.**
```bash
php artisan make:provider <name>
```
7.**Membuat form request validation.**
```bash
php artisan make:request <name>
```
8.**Membuat resource baru untuk API.**
```bash
php artisan make:resource <name>
```
9.**Membuat custom validation rule.**
```bash
php artisan make:rule <name>
```
10.**Membuat file test unit atau feature.**
```bash
php artisan make:test <name>
```

### **Notifications**
1.**Membuat notification baru.**
```bash
php artisan make:notification <name>
```
2.**Membuat tabel database untuk notifikasi.**
```bash
php artisan notifications:table
```

### **Passport (for API Authentication)**
1.**Menginstall key enkripsi OAuth.**
```bash
php artisan passport:install
```
2.**Membuat klien OAuth baru.**
```bash
php artisan passport:client
```
3.**Menghasilkan ulang enkripsi kunci.**
```bash
php artisan passport:keys
```
   
### **Routing**
1.**Menampilkan semua route aplikasi.**
```bash
php artisan route:list
```
2.**Menghapus cache route.**
```bash
php artisan route:clear
```

### **Scheduling**
1.**Menjalankan semua tugas yang terjadwal.**
```bash
php artisan schedule:run
```
2.**Menjalankan worker untuk tugas terjadwal.**
```bash
php artisan schedule:work
```
3.**Menampilkan daftar jadwal tugas.**
```bash
php artisan schedule:list
```

### **Scout (Search Integration)**
1.**Mengimpor semua model ke indeks pencarian.**
```bash
php artisan scout:import <model>
```
2.**Menghapus indeks dari penyedia pencarian.**
```bash
php artisan scout:flush <model>
```

### **Session**
1.**Membuat tabel untuk menyimpan session di database.**
```bash
php artisan session:table
```

### **Storage**
1.**Membuat symbolic link untuk storage.**
```bash
php artisan storage:link
```

### **Testing**
1.**Menjalankan semua test.**
```bash
php artisan test
```
2.**Menjalankan test yang sesuai filter tertentu.**
```bash
php artisan test --filter <name>
```

### **Tinker**
1.**Menjalankan REPL untuk mengeksplorasi objek dan database.**
```bash
php artisan tinker
```

### **Vendor Publishing**
1.**Mempublikasikan file dari package ke folder aplikasi.**
```bash
php artisan vendor:publish
```

### **Package Discovery**
1.**Menemukan ulang semua package otomatis.**
```bash
php artisan package:discover
```

## Ini adalah daftar komprehensif command `php artisan` yang tersedia di Laravel, meskipun beberapa mungkin lebih sering digunakan atau hanya relevan dengan package tertentu.
