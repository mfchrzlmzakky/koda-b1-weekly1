const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

const menuData = {
  mie: [
    { id: 1, name: "Mie Gacoan", price: 15000 },
    { id: 2, name: "Mie Hompimpa", price: 15000 },
    { id: 3, name: "Mie Suit", price: 15000 },
  ],
  drink: [
    { id: 1, name: "Air Mineral", price: 6500 },
    { id: 2, name: "Tea", price: 6500 },
    { id: 3, name: "Orange", price: 8000 },
    { id: 4, name: "Lemon Tea", price: 9500 },
    { id: 5, name: "Thai Tea", price: 12500 },
    { id: 6, name: "Thai Green Tea", price: 12500 },
  ],
  dimsum: [
    { id: 1, name: "Pangsit Goreng", price: 15000 },
    { id: 2, name: "Lumpia Udang", price: 14000 },
    { id: 3, name: "Udang Keju", price: 14000 },
    { id: 4, name: "Udang Rambutan", price: 14000 },
    { id: 5, name: "Siomay", price: 14000 },
  ],
};

const keranjangPesanan = [];

function showItems(title, items) {
  console.log(`\n${title}`);
  items.forEach((item) => {
    console.log(`${item.id}. ${item.name} - ${item.price}`);
  });
}

async function showCategories() {
  while (true) {
    console.log("\n=======\nDaftar Makanan & Minuman");
    console.log("1. Mie");
    console.log("2. Minuman");
    console.log("3. Dimsum");
    console.log("0. Kembali");
    const ans = await rl.question("-------\nPilih Kategori: ");
    console.log("=======");
    switch (ans) {
      case "1":
        await orderItem("=======\nDaftar Mie", menuData.mie, "-------\nPilih mie: ", "Mie");
        break;
      case "2":
        await orderItem("=======\nDaftar Minuman", menuData.drink, "-------\nPilih minuman: ", "Minuman");
        break;
      case "3":
        await orderItem("=======\nDaftar Dimsum", menuData.dimsum, "-------\nPilih dimsum: ", "Dimsum");
        break;
      case "0":
        return;
      default:
        console.log(`Kategori "${ans}" tidak ada!\n=======`);
    }
  }
}

async function orderItem(title, data, subtitle, category) {
  while (true) {
    showItems(title, data);
    console.log("0. Kembali");
    const ans = await rl.question(subtitle);
    console.log("=======");
    if (Number(ans) > 0 && Number(ans) <= data.length) {
      while (true) {
        const ans2 = await rl.question(`Pesan ${data[ans - 1].name} berapa? `);
        console.log("=======");
        // ADA YANG PERLU DIPERBAIKI
        if (Number(ans2) > 0) {
          for (let i = 0; i < data.length; i++) {
            if (Number(ans) === i + 1) {
              for (let j = 0; j < Number(ans2); j++) {
                keranjangPesanan.push(data[i]);
              }
            }
          }
          console.log(keranjangPesanan);
          break;
        } else {
          console.log("Jumlah pesanan harus berupa angka & lebih dari 0\n=======");
        }
      }
    } else if (Number(ans) === 0) {
      return;
    } else {
      console.log(`${category} "${ans}" tidak ada!\n=======`);
    }
  }
}

async function main() {
  while (true) {
    console.log(`\n=======\nMIE GACOAN`);
    console.log("1. Daftar Makanan & Minuman");
    console.log("2. Keranjang");
    console.log("3. Loyalitas Pelanggan");
    console.log("0. Keluar");
    const ans = await rl.question("-------\nPilih menu nomor berapa? ");
    console.log("=======");
    switch (ans) {
      case "1":
        await showCategories();
        break;
      case "2":
        console.log("Keranjang Belanja");
        break;
      case "3":
        console.log("Pelanggan Setia");
        break;
      case "0":
        console.log("Terimakasih\n=======");
        rl.close();
        return;
      default:
        console.log(`Menu "${ans}" tidak ada!\n=======`);
    }
  }
}

main();
