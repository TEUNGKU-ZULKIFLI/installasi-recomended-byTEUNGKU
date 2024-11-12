# HAL YANG BISA DI PELAJARI SEBELUM MEMULAI MODUL INI [<kbd>BASIC</kbd>](https://github.com/TEUNGKU-ZULKIFLI/installasi-recomended-byTEUNGKU/blob/ce74a4afdc91ea40aaf2d30cb0fa34342efb4694/README.md)

# Langkah-langkah Menjalankan Laravel di Laradock dengan Custom Domain

**01. Clone repository Laradock**  
```bash
git clone https://github.com/Laradock/laradock.git
```

**02. Duplikat file `.env.example` menjadi `.env`**  
```bash
cp .env.example .env
```

**03. Masuk ke folder Nginx Sites**  
```bash
cd nginx/sites
```

**04. Duplikat file `laravel.conf.example` dan ubah namanya**  
```bash
cp laravel.conf.example (namaproject).conf
```

**04.2. Konfigurasi file `.conf`**  
- Buka file `(namaproject).conf` yang baru saja dibuat dan lakukan perubahan, seperti:
  - Ganti nama domain sesuai keinginan, misalnya: `server_name (username).test`.
  - Sesuaikan path root sesuai lokasi project Laravel yang akan dibuat: `root /var/www/(namaproject)/public`.
  - Setelah selesai, simpan file.

**05. Edit file `hosts` pada sistem**  
- Buka Notepad dengan mode administrator (Run as Administrator).
- Buka file `hosts` yang terletak di:  
  `C:\Windows\System32\drivers\etc\hosts`
- Tambahkan baris berikut di bagian akhir sebelum baris # End of section:
  ```
  127.0.0.1 (username).test
  ```
- Simpan perubahan.

**06. Unduh container, image, dan dependensi yang diperlukan**  
```bash
docker-compose up -d nginx mysql
```

**07. Masuk ke dalam container workspace**  
```bash
docker-compose exec workspace bash
```

**08. Buat project Laravel baru**  
```bash
composer create-project --prefer-dist laravel/laravel (namaproject)
```

**09. Masuk ke folder project Laravel**  
```bash
cd (namaproject)
```

**10. Berikan permission pada folder `storage`**  
```bash
chmod -R 777 storage
```

**11. Keluar dari container workspace**  
```bash
exit
```

**12. Restart Nginx agar perubahan permission terbaca**  
```bash
docker-compose restart nginx
```

**13. Masuk kembali ke container workspace**  
```bash
docker-compose exec workspace bash
```

**14. Masuk kembali ke folder project Laravel**  
```bash
cd (namaproject)
```

**15. Jalankan migrasi database**  
- Pastikan konfigurasi database di `.env` sudah sesuai (gunakan MySQL yang sudah di-setup di Laradock).
```bash
php artisan migrate
```

**16. Cek hasilnya di browser**  
- Buka browser dan akses:  
  `http://(username).test`

Jika semuanya berjalan dengan baik, kamu sudah berhasil membuat web server Laravel dengan domain custom menggunakan Laradock!

---
