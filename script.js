alert ('SELAMAT DATANG !');
var lagi = true;

while (lagi) {  // bisa juga ditulis: while (lagi == true)
    var nama = prompt('Masukkan nama: ');
    alert('Halo ' + nama);

    lagi = confirm('Coba lagi ?');
}

alert('Terima kasih…');