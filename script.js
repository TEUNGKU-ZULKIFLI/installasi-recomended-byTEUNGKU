var nama = prompt('Masukkan nama:');
switch (nama) {
    case 'dul':
    case 'Dul':
    case 'DUL':
    case 'teungku':
        alert('Halo kayaknya nama asli kamu TEUNGKU ZULKIFLI ya nggak ?');
        break;
    default:
        alert('Oy ' + nama + ' kamu jangan lupa makan ya!');
        break;
}