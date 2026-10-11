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
    console.log("    +------------------------------+");
    switch (ans) {
      case "1":
        console.log(`
    +------------------------------+
    | Silahkan pilih:              |
    |                              |
    | 1. Mie                       |
    | 2. Minuman                   |
    | 3. Dimsum                    |
    +------------------------------+`);

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

const showMenus = {
  mieMenu: [
    {
      id: 1,
      name: "Mie Gacoan",
      description: "Sensasi pedas manis menu ini dijamin bakal bikin kamu ketagihan. Bisa pilih tingkat kepedasan, lho!",
      price: 15000,
    },
    {
      id: 2,
      name: "Mie Hompimpa",
      description: "Menu wajib untuk para pecinta rasa pedas gurih. Makin nikmat dengan pilih sendiri tingkat kepedasannya.",
      price: 15000,
    },
    {
      id: 3,
      name: "Mie Suit",
      description: "Tidak suka rasa pedas? Jangan kuatir! Sensasi gurih dan asin menu ini dijamin bikin perutmu bahagia.",
      price: 15000,
    },
  ],
  dimsumMenu: [
    {
      id: 1,
      name: "Pangsit Goreng",
      description: "Paling cocok dinikmati bersama mie pedasmu. Bisa buat ngemil pas kumpul sama teman-teman juga seru kok!",
      price: 15000,
    },
    {
      id: 2,
      name: "Lumpia Udang",
      description: "Renyah di luar dan lembut di dalam dengan cita rasa udang yang dibalut kulit lumpia, nikmatnya tidak ada duanya!",
      price: 14000,
    },
    {
      id: 3,
      name: "Udang Keju",
      description: "Lelehan keju lembut dalam adonan daging udang dan ayam, dibalut tepung roti yang renyah… Inilah surga yang sebenarnya!",
      price: 14000,
    },
    {
      id: 4,
      name: "Udang Rambutan",
      description: "Bingung mau pilih yang garing atau yang lembut? Ini jawabannya! Garing di luar, lembut di dalam…",
      price: 14000,
    },
    {
      id: 5,
      name: "Siomay",
      description: "Perpaduan daging ayam dan udang yang disajikan dalam keadaan hangat ini pastinya sudah menjadi kesukaan kamu.",
      price: 14000,
    },
  ],
  beveragesMenu: [
    {
      id: 1,
      name: "Air Mineral",
      description: "Air mineral segar yang menemani harimu, cocok untuk melepas dahaga dan menjaga tubuh tetap terhidrasi.",
      price: 6501,
    },
    {
      id: 2,
      name: "Tea",
      description: "Teh segar dengan rasa klasik yang ringan dan menyegarkan, cocok dinikmati kapan saja untuk menemani aktivitasmu.",
      price: 6501,
    },
    {
      id: 3,
      name: "Orange",
      description: "Minuman jeruk dengan rasa manis dan segar yang bikin harimu lebih ceria, cocok untuk melepas dahaga di setiap suasana.",
      price: 8000,
    },
    {
      id: 4,
      name: "Lemon Tea",
      description: "Perpaduan teh yang nikmat dengan sensasi lemon yang segar, menghadirkan rasa manis dan sedikit asam yang bikin nagih.",
      price: 9500,
    },
    {
      id: 5,
      name: "Thai Tea",
      description: "Teh dengan sensasi rasa manis dan creamy, cocok buat kamu yang mau nge-reset suasana hati jadi bahagia!",
      price: 12500,
    },
    {
      id: 6,
      name: "Thai Green Tea",
      description: "Teh hijau khas Thailand dengan cita rasa manis, creamy, dan aroma teh yang khas, cocok buat kamu yang suka minuman unik dan menyegarkan.",
      price: 12500,
    },
  ],
};

main();
