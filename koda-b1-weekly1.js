const { log } = require("node:console");
const { createInterface } = require("node:readline");
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  console.log(`
    +------------------------------+
    | Silahkan pilih menu:         |
    |                              |
    | 1. Daftar Makanan & Minuman  |
    | 2. Pemesanan                 |
    | 3. Loyalitas Pelanggnan      |
    | 0. Keluar                    |
    +------------------------------+`);

  rl.question(`      Pilih menu nomor berapa? `, (ans) => {
    switch (ans) {
      case "1":
        console.log(`
    | Silahkan pilih:              |`);
        break;
      case "2":
        console.log(`
    | Proses pemesanan?            |`);
        break;
      case "3":
        console.log(`
    | Peringkat Pelanggan Setia    |`);
        break;
      case "0":
        console.log(`
    | Keluar                       |`);
        break;
      default:
        console.log("Tidak ada");
        break;
    }

    rl.close();
  });
}

main();
