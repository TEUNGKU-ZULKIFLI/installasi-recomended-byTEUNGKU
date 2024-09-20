### **INSTALL LARAVER MELALUI XAMPP >> COMPOSER / MANUAL NO DOCKER-DOCKER **

Jika kamu menggunakan **XAMPP** untuk mengembangkan aplikasi Laravel, ada beberapa hal yang perlu diperhatikan terkait konfigurasi dan instalasi. Berikut adalah panduan langkah demi langkah untuk mengatur Laravel dengan XAMPP.

### 1. **Persiapan XAMPP**
Pastikan XAMPP sudah diinstal dan diatur dengan benar. Beberapa hal yang perlu diperhatikan:
   - **Apache** dan **MySQL** harus dijalankan.
   - **PHP** di XAMPP harus versi yang didukung oleh Laravel (minimal PHP 8.0 untuk Laravel 9.x).

### 2. **Pastikan Composer Terinstal**
Laravel diinstal menggunakan **Composer**, jadi pastikan Composer sudah terinstal. Jika belum, kamu bisa mengunduh dan menginstalnya dari [getcomposer.org](https://getcomposer.org/).

Untuk memastikan Composer terinstal dengan benar, kamu bisa mengetik perintah berikut di CMD atau Terminal:

```bash
composer --version
```

### 3. **Membuat Project Laravel**
Setelah Composer dan XAMPP siap, kamu bisa membuat project Laravel dengan langkah berikut:

1. **Buka CMD atau Terminal**, kemudian arahkan ke direktori `htdocs` XAMPP, karena di situlah kamu akan menyimpan project Laravel. `htdocs` biasanya terletak di:

   ```bash
   cd C:\xampp\htdocs
   ```

2. **Buat project Laravel** menggunakan Composer:

   ```bash
   composer create-project --prefer-dist laravel/laravel nama-project
   ```

   Composer akan mengunduh Laravel beserta semua dependensinya ke dalam folder `nama-project`.

### 4. **Konfigurasi Virtual Host (Opsional)**
Agar lebih mudah diakses tanpa harus mengetik `localhost/nama-project/public`, kamu bisa mengatur **Virtual Host** di XAMPP. Berikut caranya:

1. **Buka file `httpd-vhosts.conf`** di dalam `C:\xampp\apache\conf\extra\httpd-vhosts.conf`.

2. Tambahkan konfigurasi berikut untuk project Laravel kamu:

   ```apache
   <VirtualHost *:80>
       DocumentRoot "C:/xampp/htdocs/nama-project/public"
       ServerName nama-project.local
       <Directory "C:/xampp/htdocs/nama-project">
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Tambahkan entri di file `hosts`** (C:\Windows\System32\drivers\etc\hosts) untuk memetakan domain lokal ke `localhost`:

   ```txt
   127.0.0.1 nama-project.local
   ```

4. **Restart Apache** melalui Control Panel XAMPP.

Sekarang kamu bisa mengakses project Laravel di browser dengan membuka `http://nama-project.local`.

### 5. **Mengatur Koneksi Database**
Laravel memerlukan database untuk menyimpan data aplikasi. Untuk menghubungkan Laravel ke MySQL XAMPP:

1. Buka file `.env` di root project Laravel.
2. Sesuaikan pengaturan database di `.env` seperti ini:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nama_database
   DB_USERNAME=root
   DB_PASSWORD=
   ```

Kamu bisa membuat database baru di **phpMyAdmin** (akses melalui `http://localhost/phpmyadmin`).

### 6. **Menjalankan Laravel Development Server (Opsional)**
Jika kamu tidak ingin menggunakan XAMPP untuk menjalankan Laravel, kamu bisa menggunakan built-in development server Laravel dengan menjalankan perintah berikut:

```bash
php artisan serve
```

Laravel kemudian akan berjalan di `http://localhost:8000`.

### 7. **Memastikan Folder `storage` dan `bootstrap/cache` Ditulis**
Pastikan folder `storage` dan `bootstrap/cache` memiliki izin yang memadai. Kamu bisa memberikan izin melalui CMD dengan perintah:

```bash
chmod -R 777 storage bootstrap/cache
```

### Kesimpulan
- **XAMPP** menyediakan server lokal untuk menjalankan Laravel dengan Apache dan MySQL.
- **Composer** digunakan untuk mengunduh dan mengelola dependensi Laravel.
- Kamu bisa menggunakan **Virtual Hosts** untuk mempermudah akses project Laravel melalui domain lokal.
- Jangan lupa mengatur file `.env` untuk menghubungkan Laravel dengan database MySQL dari XAMPP.

Dengan langkah-langkah di atas, Laravel akan berjalan dengan baik di lingkungan XAMPP.
