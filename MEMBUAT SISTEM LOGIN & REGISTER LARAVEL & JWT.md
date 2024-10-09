Untuk membuat sistem login dan register menggunakan Laravel dan JWT (JSON Web Token) di Laravel dengan menggunakan Laradoc, kamu bisa mengikuti langkah-langkah berikut:

### 1. **Install Laravel Sanctum atau JWT Package**
   Laravel memiliki paket JWT yang populer untuk otentikasi, yaitu [tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth). Namun, jika ingin menggunakan JWT dengan cara yang lebih sederhana, bisa menggunakan Laravel Passport atau Sanctum.

   Kita akan menggunakan **tymon/jwt-auth**:

   Jalankan perintah di terminal:
   ```bash
   composer require tymon/jwt-auth
   ```

### 2. **Konfigurasi JWT di Laravel**

   Setelah menginstal paket JWT, publikasikan konfigurasi JWT:

   ```bash
   php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
   ```

   Ini akan menambahkan file konfigurasi `jwt.php` di dalam direktori `config`.

   Lalu, buat kunci rahasia JWT dengan menjalankan perintah berikut:

   ```bash
   php artisan jwt:secret
   ```

### 3. **Setting Model User**
   Pada model `User.php` (biasanya terletak di `app/Models/User.php`), tambahkan implementasi dari `JWTSubject`:

   ```php
   use Tymon\JWTAuth\Contracts\JWTSubject;

   class User extends Authenticatable implements JWTSubject
   {
       // Tambahkan fungsi yang diperlukan oleh JWT
       public function getJWTIdentifier()
       {
           return $this->getKey();
       }

       public function getJWTCustomClaims()
       {
           return [];
       }
   }
   ```

### 4. **Buat Controller untuk Login dan Register**

   Selanjutnya, buat controller untuk meng-handle login dan register. Jalankan perintah ini untuk membuat controller baru:

   ```bash
   php artisan make:controller AuthController
   ```

   Di dalam `AuthController.php`, tambahkan kode berikut untuk fungsi register dan login:

   ```php
   namespace App\Http\Controllers;

   use App\Models\User;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Hash;
   use Illuminate\Support\Facades\Validator;
   use Tymon\JWTAuth\Facades\JWTAuth;

   class AuthController extends Controller
   {
       public function register(Request $request)
       {
           $validator = Validator::make($request->all(), [
               'name' => 'required|string|max:255',
               'email' => 'required|string|email|max:255|unique:users',
               'password' => 'required|string|min:6|confirmed',
           ]);

           if ($validator->fails()) {
               return response()->json($validator->errors(), 400);
           }

           $user = User::create([
               'name' => $request->name,
               'email' => $request->email,
               'password' => Hash::make($request->password),
           ]);

           $token = JWTAuth::fromUser($user);

           return response()->json(compact('user', 'token'), 201);
       }

       public function login(Request $request)
       {
           $credentials = $request->only('email', 'password');

           if (!$token = JWTAuth::attempt($credentials)) {
               return response()->json(['error' => 'Invalid credentials'], 401);
           }

           return response()->json(compact('token'));
       }
   }
   ```

### 5. **Tambahkan Routes**

   Tambahkan route untuk login dan register di file `routes/api.php`:

   ```php
   use App\Http\Controllers\AuthController;

   Route::post('register', [AuthController::class, 'register']);
   Route::post('login', [AuthController::class, 'login']);
   ```

### 6. **Proteksi Route dengan Middleware JWT**

   Untuk mengamankan route menggunakan JWT, kamu bisa menggunakan middleware `jwt.auth`. Tambahkan middleware ini di dalam route, misalnya:

   ```php
   Route::middleware('auth:api')->group(function () {
       Route::get('user', function () {
           return auth()->user();
       });
   });
   ```

   Jangan lupa untuk menambahkan middleware `jwt.auth` di file `app/Http/Kernel.php` pada bagian `$routeMiddleware`:

   ```php
   'jwt.auth' => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
   'jwt.refresh' => \Tymon\JWTAuth\Http\Middleware\RefreshToken::class,
   ```

### 7. **Pengaturan di `.env`**
   Pastikan dalam file `.env`, konfigurasi JWT sudah benar, seperti berikut:

   ```
   JWT_SECRET=your_jwt_secret_key
   ```

   Sesuaikan `your_jwt_secret_key` dengan yang dihasilkan oleh `php artisan jwt:secret`.

### 8. **Testing API Menggunakan Postman**
   - **Register**: POST request ke `http://localhost:8000/api/register` dengan body:
     ```json
     {
         "name": "User name",
         "email": "username@example.com",
         "password": "password",
         "password_confirmation": "password"
     }
     ```

   - **Login**: POST request ke `http://localhost:8000/api/login` dengan body:
     ```json
     {
         "email": "username@example.com",
         "password": "password"
     }
     ```

   Jika berhasil, kamu akan mendapatkan token JWT yang bisa digunakan untuk mengakses route yang dilindungi.

### 9. **Menjalankan Laradoc**
   Jika kamu menggunakan Laradoc sebagai environment development, pastikan environment Laradoc kamu sudah berjalan dengan lancar. Jalankan perintah berikut untuk memastikan semua container berjalan:
   ```bash
   docker-compose up -d nginx mysql phpmyadmin redis
   ```

Dengan langkah-langkah ini, sistem login dan register dengan Laravel dan JWT sudah bisa berjalan. Kamu juga bisa menambahkan fitur-fitur seperti reset password dan logout jika diperlukan.
