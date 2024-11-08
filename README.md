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
