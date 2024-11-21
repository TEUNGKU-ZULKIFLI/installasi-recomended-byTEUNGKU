# HAL YANG BISA DI PELAJARI SEBELUM MEMULAI MODUL INI [<kbd>BASIC</kbd>](https://github.com/TEUNGKU-ZULKIFLI/installasi-recomended-byTEUNGKU/blob/main/README.md)

# Untuk menambahkan sistem CRUID dengan format json, tentu dari table database yang telah kita buat.
## Note: Ini merupakan series lanjutan dari [<kbd>MENAMPILKAN DATABASE](https://github.com/TEUNGKU-ZULKIFLI/installasi-recomended-byTEUNGKU/blob/main/MENAMPILKAN_DATABASE.md).
# ⚠️SANGAT DIMOHON MENGIKUTI TAHAPAN SEBELUMNYA⚠️
---

## **01.Menambahkan function CRUID**
**buka file MahasiswaController.php di path app/Http/Controllers/Api/Admin/**

**Dan coding tipis-tipis**
```codingan
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MahasiswaResource;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index(Request $request)
    {
        $mahasiswas = Mahasiswa::when($request->q, function ($query) use ($request) {
            return $query->where('nama', 'like', '%' . $request->q . '%');
        })->latest()->paginate(5);

        return new MahasiswaResource(true, 'List Data Mahasiswa', $mahasiswas);
    }

    // UNTUK MENAMBAHKAN DATA MAHASISWA
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nim'            => 'required|unique:mahasiswas',
            'nama'           => 'required|string|max:100',
            'prodi_id'       => 'required|exists:prodies,id',
            'email'          => 'required|email|unique:mahasiswas',
            'no_hp'          => 'required|unique:mahasiswas|max:15',
            'jenis_kelamin'  => 'required|boolean',
            'tempat_lahir'   => 'required|string|max:100',
            'tanggal_lahir'  => 'required|date',
            'golongan_darah' => 'nullable|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mahasiswa = Mahasiswa::create($request->all());

        if ($mahasiswa) {
            return new MahasiswaResource(true, 'Data Mahasiswa Berhasil Disimpan', $mahasiswa);
        }

        return new MahasiswaResource(false, 'Data Mahasiswa Gagal Disimpan!', null);
    }

    // UNTUK MENAMPILKAN DATA MAHASISWA BERDASARKAN ID
    public function show(Mahasiswa $mahasiswa)
    {
        if ($mahasiswa) {
            return new MahasiswaResource(true, 'Detail Data Mahasiswa!', $mahasiswa);
        }

        return new MahasiswaResource(false, 'Detail Data Mahasiswa Tidak Ditemukan', null);
    }

    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        $validator = Validator::make($request->all(), [
            'nim'            => 'required|unique:mahasiswas,nim,' . $mahasiswa->id,
            'nama'           => 'required|string|max:100',
            'prodi_id'       => 'required|exists:prodies,id',
            'email'          => 'required|email|unique:mahasiswas,email,' . $mahasiswa->id,
            'no_hp'          => 'required|unique:mahasiswas,no_hp,' . $mahasiswa->id,
            'jenis_kelamin'  => 'required|boolean',
            'tempat_lahir'   => 'required|string|max:100',
            'tanggal_lahir'  => 'required|date',
            'golongan_darah' => 'nullable|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mahasiswa->update($request->all());

        if ($mahasiswa) {
            return new MahasiswaResource(true, 'Data Mahasiswa Berhasil Diupdate', $mahasiswa);
        }

        return new MahasiswaResource(false, 'Data Mahasiswa Gagal Diupdate!', null);
    }

    // UNTUK MENGHAPUS DATA MAHASISWA
    public function destroy(Mahasiswa $mahasiswa)
    {
        if ($mahasiswa->delete()) {
            return new MahasiswaResource(true, 'Data Mahasiswa Berhasil Dihapus', null);
        }

        return new MahasiswaResource(false, 'Data Mahasiswa Gagal Dihapus!', null);
    }
}

```

## **02.Mengedit dibagian Model Mahasiswa**
**buka file Mahasiswa.php di path /app/Models/**

**Dan coding tipis-tipis**
```codingan
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    /**
     * Kolom yang diizinkan untuk mass assignment.
     */
    protected $fillable = [
        'nim',
        'nama',
        'prodi_id',
        'email',
        'no_hp',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'golongan_darah',
    ];

    /**
     * Relasi dengan tabel `prodies`.
     */
    public function prodi()
    {
        return $this->belongsTo(Prodi::class);
    }
}
```

## **03.Menambahkan dan koding Model Prodi**

### **03.1.Membuat Models Prodi.php**
```bash
php artisan make:model Prodi
```

### **03.2.Ngoding Tipis-tipis di /app/Models/Prodi.php**
```codingan
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_studi',
    ];

    /**
     * Relasi dengan model Mahasiswa.
     */
    public function mahasiswas()
    {
        return $this->hasMany(Mahasiswa::class);
    }
}
```

## **03.Mengedit di bagian Mahasiswa Resource**
**buka file MahasiswaResource.php di path /app/Http/Resources/ dan coding tipis-tipis**
```codingan
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MahasiswaResource extends JsonResource
{
    public $status;
    public $message;


    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;

    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => $this->resource ?? []
        ];
    }
}
```

## **04.Merunningnya dengan perintah php**

**Jalankan ini dulu supaya mengosongkan data yang dulunya pernah di up**
```bash
php artisan db:wipe
```

**Disusul dengan comand bash ini**
```bash
php artisan migrate:refresh
```

**Setelah semua dan sekian lamanya, disave dan di ini itukan ya sekarang kita run kan dengan mengetik di bash root**
```bash
php artisan db:seed
```


## **05.Menguji dengan POSTMAN**
[![Tonton video](https://cdn.icon-icons.com/icons2/3053/PNG/512/postman_macos_bigsur_icon_189815.png)](https://youtu.be/LFExDOkz_ys)

## **06.ISIAN DATA EXAMPLE NANTINYA**
```json
{
    "nim": "2022903430099",
    "nama": "Umar apa gampoeng",
    "prodi_id": 1,
    "email": "umargp@example.com",
    "no_hp": "081234567890",
    "jenis_kelamin": true,
    "tempat_lahir": "ACEH",
    "tanggal_lahir": "2000-01-01",
    "golongan_darah": "A"
}
```