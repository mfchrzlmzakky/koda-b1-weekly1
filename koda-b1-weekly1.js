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

const cart = [];

function formatRupiah(price) {
  return "Rp" + price.toLocaleString("id-ID");
}

function showItems(title, items) {
  console.log(`\n${title}`);
  items.forEach((item) => {
    console.log(`${item.id}. ${item.name} - ${formatRupiah(item.price)}`);
  });
  console.log("0. Kembali");
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

async function orderItem(title, data, prompt, category) {
  while (true) {
    showItems(title, data);
    const ans = await rl.question(prompt);
    console.log("=======");
    if (Number(ans) > 0 && Number(ans) <= data.length) {
      while (true) {
        const ans2 = await rl.question(`Pesan ${data[ans - 1].name} berapa? `);
        console.log("=======");
        // ADA YANG PERLU DIPERBAIKI
        if (Number(ans2) > 0) {
          for (let i = 0; i < data.length; i++) {
            if (Number(ans) === i + 1) {
              const data2 = data[i];
              cart.push({ ...data2, qty: Number(ans2) });
            }
          }
          console.log(cart);
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

function showCart() {
  console.log("Keranjang");
  console.log(cart);

  if (cart.length === 0) {
    console.log("Keranjang masih kosong!");
    return;
  }
  let total = 0;
  cart.forEach((item) => {
    const subTotal = item.price * item.qty;
    total += subTotal;
    console.log(`${item.name} x ${item.qty}= ${formatRupiah(subTotal)}`);
  });
  console.log(`Total= ${formatRupiah(total)}`);
}

async function main() {
  try {
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
          // console.log("Keranjang Belanja");
          showCart();
          break;
        case "3":
          console.log("Pelanggan Setia");
          break;
        case "0":
          console.log("Terimakasih\n=======");
          return;
        default:
          console.log(`Menu "${ans}" tidak ada!\n=======`);
      }
    }
  } catch (error) {
    console.log("\nProgram dihentikan: ", error.message);
  } finally {
    rl.close();
  }
}

main();
