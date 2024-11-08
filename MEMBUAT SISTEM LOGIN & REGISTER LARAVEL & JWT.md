# Untuk membuat sistem login aut token menggunakan Laravel dan JWT (JSON Web Token) di Laravel dengan menggunakan Laradock
## Note:"DATA USER & PASSWD DARI FILE database/seeders/UserSeeder.php" disarankan baca, teliti, dan telaah dulu 😊.

### 01.Membuat file User Seeder dangan perintah php.

masuk workspace
   ```bash
   docker-compose exec workspace bash
   ```

masuk folder laravel
   ```bash
   cd nama-folder-laravelnya
   ```

membuat file User Seeder
   ```bash
   php artisan make:seeder UserSeeder
   ```

membuka file User Seeder itu di path databases/seeder/UserSeeder.php
```codingan
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Administrator',
            'email' => 'admin@teungku.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```

kemudian running artisan dengan perintah
```bash
php artisan db:seed --class=UserSeeder
```

### 02.Instalasi dan Konfigurasi JWT
Install JWT
```bash
composer require tymon/jwt-auth
```

publikasi file JWT
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

generate key JWT
```bash
php artisan jwt:secret
```
buka file auth.php di path config/auth.php
dibagian

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | which utilizes session storage plus the Eloquent user provider.
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | Supported: "session"
    |
    */
tambahkan kode ini
```code
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api_admin' => [
        'driver' => 'jwt',
        'provider' => 'users',
        'hash' => false,
    ],
],
```

### 03. Konfigurasi model user pada file app/Models/User.php
ubah codingannya dengan berikut ini
```code
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Implementasi metode aut JWT
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

}
```

### 04. Membuat file Login Controller.php melalui artisan
Buat LoginController: Jalankan perintah berikut untuk membuat controller
```bash
php artisan make:controller Api/Admin/LoginController
```

ubah codingannya dengan code berikut ini
```bash
<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->guard('api_admin')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or Password is incorrect'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user' => auth()->guard('api_admin')->user(),
            'token' => $token
        ], 200);
    }

    public function getUser()
    {
        return response()->json([
            'success' => true,
            'user' => auth()->guard('api_admin')->user()
        ], 200);
    }

    public function refreshToken(Request $request)
    {
        $refreshToken = JWTAuth::refresh(JWTAuth::getToken());
        $user = JWTAuth::setToken($refreshToken)->toUser();
        $request->headers->set('Authorization', 'Bearer ' . $refreshToken);

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $refreshToken,
        ], 200);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'success' => true,
        ], 200);
    }
}
```

### 05. Mengonfigurasi file api.php
menginstall api.php melalui artisan
```bash
php artisan install:api
```

nanti yes saja untuk migrate " One new database migration has been published. Would you like to run all pending database migrations? (yes/no) [yes]:
 > yes"

ubah codingannya dengan code ini
```code
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\LoginController;

Route::prefix('admin')->group(function () {
    Route::post('/login', [LoginController::class, 'index'])->name('admin.login');

    Route::group(['middleware' => 'auth:api_admin'], function () {
        Route::get('/user', [LoginController::class, 'getUser'])->name('admin.user');
        Route::get('/refresh', [LoginController::class, 'refreshToken'])->name('admin.refresh');
        Route::post('/logout', [LoginController::class, 'logout'])->name('admin.logout');
    });
});
```

### 06. Menguji dengan postman
[![Tonton video](https://cdn.icon-icons.com/icons2/3053/PNG/512/postman_alt_macos_bigsur_icon_189814.png)](https://youtu.be/VcoHwvQ71hA)
