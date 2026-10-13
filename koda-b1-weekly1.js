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

const cart = { nama: "", statusBayar: "", pesanan: [] };

function resetCart() {
  cart.nama = "";
  cart.statusBayar = "";
  cart.pesanan = [];
}

function formatRupiah(price) {
  return "Rp" + price.toLocaleString("id-ID");
}

function calculateTotal() {
  let total = 0;
  cart.pesanan.forEach((item) => {
    total += item.price * item.qty;
  });
  return total;
}

function showItems(title, items) {
  console.log(`\n${title}`);
  items.forEach((item) => {
    console.log(`${item.id}. ${item.name} - ${formatRupiah(item.price)}`);
  });
  console.log("0. Kembali");
}

async function askQuantity(item) {
  while (true) {
    const ans = await rl.question(`Pesan ${item.name} berapa? `);
    console.log("=======");
    const jumlah = Number(ans);
    if (Number.isInteger(jumlah) && jumlah > 0) {
      return jumlah;
    }
    console.log("Jumlah pesanan harus berupa angka bulat & lebih dari 0\n=======");
  }
}

async function afterAdd() {
  while (true) {
    console.log("\n=======\n1. Lanjut bayar");
    console.log("0. Tambah pesanan");
    const ans = await rl.question(`-------\nPilih : `);
    console.log("=======");
    if (ans === "1") {
      const lunas = await showCart();
      if (lunas) return true;
    } else if (ans === "0") {
      return false;
    } else {
      console.log(`Pilihan "${ans}" tidak ada!\n=======`);
    }
  }
}

async function orderItem(title, data, prompt, category) {
  while (true) {
    showItems(title, data);
    const ans = await rl.question(prompt);
    console.log("=======");
    if (ans.trim() === "0") {
      return false;
    }
    const pilihan = Number(ans);
    if (!Number.isInteger(pilihan) || pilihan < 1 || pilihan > data.length) {
      console.log(`${category} "${ans}" tidak ada!\n=======`);
      continue;
    }
    const item = data[pilihan - 1];
    const qty = await askQuantity(item);
    cart.pesanan.push({ ...item, qty });
    console.log(`${item.name} x ${qty} berhasil ditambahkan ke keranjang\n=======`);
    return await afterAdd();
  }
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
    let lunas = false;
    switch (ans) {
      case "1":
        lunas = await orderItem("=======\nDaftar Mie", menuData.mie, "-------\nPilih mie: ", "Mie");
        break;
      case "2":
        lunas = await orderItem("=======\nDaftar Minuman", menuData.drink, "-------\nPilih minuman: ", "Minuman");
        break;
      case "3":
        lunas = await orderItem("=======\nDaftar Dimsum", menuData.dimsum, "-------\nPilih dimsum: ", "Dimsum");
        break;
      case "0":
        return;
      default:
        console.log(`Kategori "${ans}" tidak ada!\n=======`);
    }
    if (lunas) return;
  }
}

async function pay() {
  let nama = "";
  while (nama === "") {
    nama = (await rl.question("Atas nama siapa? ")).trim();
    if (nama === "") {
      console.log("Nama tidak boleh kosong!");
    }
  }
  console.log("=======");
  cart.nama = nama;
  cart.statusBayar = "Lunas";
  console.log("\n=====================");
  console.log("MIE GACOAN");
  console.log("---------------------");
  console.log("STRUK PEMBELIAN");
  console.log("---------------------");
  cart.pesanan.forEach((item) => {
    console.log(`${item.name} x ${item.qty} = ${formatRupiah(item.price * item.qty)}`);
  });
  console.log(`---------------------\nTotal = ${formatRupiah(calculateTotal())}`);
  console.log(`---------------------\nAtas Nama ${cart.nama}`);
  console.log(`Status    ${cart.statusBayar}`);
  console.log("---------------------\nTerimakasih\n=====================");
  resetCart();
}

async function showCart() {
  console.log("\n=======\nKeranjang\n-------");
  if (cart.pesanan.length === 0) {
    console.log("Keranjang masih kosong!\n=======");
    return false;
  }
  cart.pesanan.forEach((item) => {
    console.log(`${item.name} x ${item.qty} = ${formatRupiah(item.price * item.qty)}`);
  });
  console.log(`-------\nTotal = ${formatRupiah(calculateTotal())}\n=======`);
  while (true) {
    console.log("1. Bayar sekarang");
    console.log("0. kembali");
    const ans = await rl.question(`-------\nPilih : `);
    console.log("=======");
    if (ans === "1") {
      await pay();
      return true;
    } else if (ans === "0") {
      return false;
    } else {
      console.log(`pilihan "${ans}" tidak ada!\n=======\n\n=======`);
    }
  }
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
          await showCart();
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
