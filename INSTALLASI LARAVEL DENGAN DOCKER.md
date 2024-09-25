### **INSTALL LARAVER MELALUI DOCKER**

Berikut adalah panduan dalam Bahasa Indonesia untuk setup **Laravel** dengan **Laradock** pada beberapa proyek menggunakan **Git Bash** dan **Docker** di Windows:

### B) Setup untuk Beberapa Proyek

Jika kamu ingin menggunakan satu lingkungan Docker untuk beberapa proyek, ikuti langkah-langkah berikut:

### 1. **Clone Repositori Laradock**
   Clone **repositori Laradock** ke mana saja di mesin kamu (mirip dengan langkah A.2 di panduan sebelumnya):
   
   ```bash
   git clone https://github.com/laradock/laradock.git
   ```

   Struktur folder kamu akan terlihat seperti ini:
   
   ```
   - laradock
   - project-1
   - project-2
   ```

   Pastikan variabel **`APP_CODE_PATH_HOST`** dalam file `.env` diatur untuk menunjuk ke direktori induk:

   ```bash
   APP_CODE_PATH_HOST=../
   ```

### 2. **Konfigurasi Server Web (Nginx/Apache)**
   Pergi ke direktori server web kamu dan buat file konfigurasi untuk menunjuk ke direktori proyek yang berbeda saat mengakses domain yang berbeda:

   - Untuk **Nginx**, pergi ke folder `nginx/sites`.
   - Untuk **Apache2**, pergi ke folder `apache2/sites`.

   Laradock secara default menyertakan beberapa file contoh untuk kamu salin, seperti `app.conf.example`, `laravel.conf.example`, dan `symfony.conf.example`.

### 3. **Ganti Nama File Konfigurasi**
   Kamu bisa mengganti nama file konfigurasi, folder proyek, dan domain sesuai keinginan. Pastikan root dalam file konfigurasi menunjuk ke folder proyek yang benar.

   Misalnya, jika kamu memiliki proyek bernama `project-1`, pastikan root di file konfigurasi mengarah ke folder tersebut.

### 4. **Tambahkan Domain ke File Hosts**
   Kamu perlu menambahkan domain untuk proyek-proyek tersebut di file hosts pada komputer kamu:

   ```bash
   127.0.0.1 project-1.test
   127.0.0.1 project-2.test
   ```

   **Catatan**: Jika kamu menggunakan Chrome versi 63 ke atas, hindari menggunakan domain `.dev` untuk pengembangan. Sebaiknya gunakan `.localhost`, `.invalid`, `.test`, atau `.example`.

Pada Windows 11 (dan versi Windows lainnya), file **hosts** tidak berada di tempat yang langsung terlihat, tetapi bisa diakses dan diedit. File **hosts** digunakan untuk memetakan domain (seperti `project-1.test`) ke alamat IP lokal (seperti `127.0.0.1`), dan berikut cara menemukannya:

### Cara Menemukan dan Mengedit File Hosts di Windows 11

1. **Buka Notepad sebagai Administrator**:
   - Klik tombol **Start**.
   - Cari **Notepad**.
   - Klik kanan pada **Notepad** dan pilih **Run as administrator**.

2. **Akses File Hosts**:
   - Di dalam Notepad, klik **File** > **Open**.
   - Masukkan path berikut di bar alamat:
     ```bash
     C:\Windows\System32\drivers\etc
     ```
   - Pastikan di bagian kanan bawah di dialog "Open", kamu mengubah opsi dari "Text Documents" menjadi "All Files". Ini karena file **hosts** tidak memiliki ekstensi.

3. **Edit File Hosts**:
   - Setelah file **hosts** terbuka, tambahkan entri seperti berikut di bagian paling bawah:
     ```bash
     127.0.0.1  project-1.test
     127.0.0.1  project-2.test
     ```
   - Kamu bisa menambahkan lebih banyak entri untuk proyek-proyek lain sesuai kebutuhan.

4. **Simpan Perubahan**:
   - Setelah selesai menambahkan domain, simpan file (gunakan **Ctrl + S** atau klik **File** > **Save**).

### Restart Browser
Setelah mengedit file hosts, tutup dan buka kembali browser kamu untuk memastikan perubahan diterapkan.

Jika kamu sudah mengikuti langkah-langkah ini, domain seperti `project-1.test` atau `project-2.test` akan diarahkan ke `localhost` di sistem Windows 11-mu.

### 5. **Penggunaan**
   **Baca Sebelum Memulai**:

   Jika kamu menggunakan **Docker Toolbox (VM)**, kamu harus:
   
   - Meng-upgrade ke **Docker Desktop for Mac/Windows** (disarankan). Lihat panduan **Upgrading Laradock**.
   - Gunakan Laradock versi 3.* dengan branch **Laradock-ToolBox** (versi lama).

   Kami merekomendasikan menggunakan versi Docker Engine yang lebih baru dari **19.03.0**.

### 1. **Masuk ke Folder Laradock dan Salin File `.env`**
   Masuk ke folder Laradock dan salin file `.env.example` menjadi `.env`:

   ```bash
   cp .env.example .env
   ```

   Kamu bisa mengedit file `.env` untuk memilih perangkat lunak mana yang ingin diinstal di lingkungan kamu. Selalu lihat file `docker-compose.yml` untuk melihat bagaimana variabel tersebut digunakan.

   **Catatan untuk Pengguna Windows**: Jika kamu menjalankan Laradock di Windows, pastikan untuk menggunakan pemisah yang benar di variabel **COMPOSE_FILE**. Jika ada beberapa file, gunakan `;` sebagai pemisah.

   - Jika kamu menggunakan beberapa proyek, pastikan mengubah variabel **COMPOSE_PROJECT_NAME** menjadi nama proyek yang unik untuk menghindari pencampuran data antar kontainer.

### 2. **Bangun Lingkungan dan Jalankan dengan Docker Compose**
   Untuk contoh ini, kita akan menjalankan **NGINX** (server web) dan **MySQL** (mesin database) untuk hosting skrip PHP:

   ```bash
   docker-compose up -d nginx mysql
   ```

   **Catatan**: Semua kontainer web server seperti **nginx** dan **apache** tergantung pada **php-fpm**, yang akan otomatis dijalankan saat kamu menjalankan server. Kamu tidak perlu menyebutkannya secara eksplisit dalam perintah `up`.

   Kamu bisa memilih kombinasi kontainer yang dibutuhkan sesuai dengan proyek kamu.

### 3. **Masuk ke Dalam Kontainer Workspace**
   Untuk menjalankan perintah seperti **Artisan**, **Composer**, **PHPUnit**, dan **Gulp**, masuk ke dalam kontainer workspace:

   ```bash
   docker-compose exec workspace bash
   ```

   Untuk pengguna Windows **PowerShell**, kamu bisa menggunakan perintah ini untuk masuk ke kontainer:

   ```bash
   docker exec -it {workspace-container-id} bash
   ```

   Kamu juga bisa menambahkan **`--user=laradock`** agar file yang dibuat memiliki izin pengguna yang sama dengan host. Contoh:

   ```bash
   docker-compose exec --user=laradock workspace bash
   ```

### 4. **Konfigurasi Proyek untuk Menggunakan Database**
   Buka file `.env` proyek PHP kamu, atau file konfigurasi lainnya, dan setel **DB_HOST** ke `mysql`:

   ```bash
   DB_HOST=mysql
   ```

   Kamu dapat menggunakan kredensial database default dari Laradock yang ada di file `.env` (misalnya, **MYSQL_USER=**), atau kamu bisa mengubahnya dan melakukan rebuild kontainer.

### 5. **Akses Proyek di Browser**
   Pastikan kamu menggunakan nomor port yang benar sesuai dengan server yang sedang berjalan. Kunjungi aplikasi di:

   ```bash
   http://localhost
   ```

   Jika kamu mengikuti setup untuk beberapa proyek, kamu bisa mengunjungi:
   
   - `http://project-1.test/`
   - `http://project-2.test/`

Itu dia panduan lengkap untuk setup **Laravel** menggunakan **Laradock** pada beberapa proyek di Windows dengan **Git Bash** dan **Docker**.
