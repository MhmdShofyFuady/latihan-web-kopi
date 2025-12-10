// === Pertemuan 9: JS dasar ===
console.log("script.js loaded");

// Helper dom
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// === Pertemuan 10: kontrol alur, perulangan, fungsi ===
// Contoh data produk & render dinamis jika wadahnya ada
const dataProduk = [
  { nama: "Kopi Arabika Gayo", harga: 45000 },
  { nama: "Kopi Robusta Temanggung", harga: 38000 },
  { nama: "Kopi Liberika Riau", harga: 42000 },
];

function renderProdukDinamis() {
  const list = document.getElementById("daftar-produk"); // <ul id="daftar-produk"> (opsional)
  if (!list) return;
  list.innerHTML = "";
  dataProduk.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}`;
    list.appendChild(li);
  });
}
renderProdukDinamis();

// Fungsi & percabangan sederhana
function hitungTotal(harga, jumlah) {
  const h = Number(harga) || 0;
  const j = Number(jumlah) || 0;
  return h * j;
}
// Demo kecil (cek di console):
console.log("Total 45.000 x 2 =", hitungTotal(45000, 2)); // sesuai tugas fungsi pertemuan 10
// (Validasi input sederhana juga difinalkan di bagian DOM pertemuan 11)

// Contoh rating label (pindahkan dari inline script HTML ke sini)
(function ratingLabel() {
  const el = document.getElementById("hasil-rating"); // <span id="hasil-rating">
  if (!el) return;
  const rating = Number(el.dataset.value || 4); // bisa di-set via data-value di HTML
  let label = "★ Tidak Direkomendasikan";
  if (rating >= 4.5) label = "★★★★★ Sangat Disarankan";
  else if (rating >= 3) label = "★★★ Rekomendasi Biasa";
  el.textContent = label;
})();

// === Pertemuan 11: DOM, event, validasi interaktif ===
// Elemen form kontak (opsional: hanya aktif di kontak.html)
const form = document.getElementById("formKontak");
const field = {
  nama: document.getElementById("nama"),
  email: document.getElementById("email"),
  kategori: document.getElementById("kategori"),
  pesan: document.getElementById("pesan"),
  hp: document.getElementById("hp"),
  langganan: document.getElementById("langganan"),
};
const errorEl = {
  nama: document.getElementById("errorNama"),
  email: document.getElementById("errorEmail"),
  kategori: document.getElementById("errorKategori"),
  pesan: document.getElementById("errorPesan"),
  hp: document.getElementById("errorHp"),
};
const successMsg = document.getElementById("successMsg");
const clearBtn = document.getElementById("clearBtn");
const counterPesan = document.getElementById("counterPesan");

function setError(input, elError, msg) {
  if (!input || !elError) return false;
  elError.textContent = msg;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  return false;
}
function setSuccess(input, elError) {
  if (!input || !elError) return true;
  elError.textContent = "";
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  return true;
}

// Aturan validasi sesuai modul: nama wajib, email format & domain @gmail.com,
// kategori wajib dipilih, pesan minimal panjang tertentu, HP angka saja. :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}
const EMAIL_GMAIL = /^[^ ]+@gmail\.com$/i;

function validateNama() {
  const v = field.nama?.value?.trim() || "";
  return v === ""
    ? setError(field.nama, errorEl.nama, "Nama wajib diisi.")
    : setSuccess(field.nama, errorEl.nama);
}
function validateEmail() {
  const v = field.email?.value?.trim() || "";
  return EMAIL_GMAIL.test(v)
    ? setSuccess(field.email, errorEl.email)
    : setError(field.email, errorEl.email, "Email harus @gmail.com dan format benar.");
}
function validateKategori() {
  const v = field.kategori?.value || "";
  return v === ""
    ? setError(field.kategori, errorEl.kategori, "Silakan pilih kategori.")
    : setSuccess(field.kategori, errorEl.kategori);
}
function validatePesan() {
  const v = field.pesan?.value || "";
  if (counterPesan) counterPesan.textContent = `${v.length}/200`;
  return v.trim().length < 10
    ? setError(field.pesan, errorEl.pesan, "Minimal 10 karakter.")
    : setSuccess(field.pesan, errorEl.pesan);
}
function validateHp() {
  const v = field.hp?.value?.trim() || "";
  return /^\d+$/.test(v) || v === ""
    ? setSuccess(field.hp, errorEl.hp)
    : setError(field.hp, errorEl.hp, "Hanya boleh angka.");
}

// Live validation (blur/input/change) — sesuai praktik validasi interaktif. :contentReference[oaicite:8]{index=8}
if (form) {
  field.nama?.addEventListener("blur", validateNama);
  field.email?.addEventListener("blur", validateEmail);
  field.kategori?.addEventListener("change", validateKategori);
  field.pesan?.addEventListener("input", validatePesan);
  field.hp?.addEventListener("input", validateHp);

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // intercept submit
    const ok =
      validateNama() &
      validateEmail() &
      validateKategori() &
      validatePesan() &
      validateHp();

    if (ok) {
      // Tampilkan feedback sukses non-alert sesuai tugas. :contentReference[oaicite:9]{index=9}
      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // Reset form secukupnya
      form.reset();
      Object.values(errorEl).forEach((el) => el && (el.textContent = ""));
      Object.values(field).forEach((el) => el && el.classList.remove("is-valid", "is-invalid"));
      if (counterPesan) counterPesan.textContent = "0/200";
    }
  });

  // Tombol clear data (tugas pertemuan 11) :contentReference[oaicite:10]{index=10}
  clearBtn?.addEventListener("click", () => {
    form.reset();
    Object.values(errorEl).forEach((el) => el && (el.textContent = ""));
    Object.values(field).forEach((el) => el && el.classList.remove("is-valid", "is-invalid"));
    if (successMsg) successMsg.hidden = true;
    if (counterPesan) counterPesan.textContent = "0/200";
  });
}

// Bonus pertemuan 11 dari modul: preview input & ubah tema jika elemennya ada. :contentReference[oaicite:11]{index=11}
(function addPreviewAndTheme() {
  const produkInput = document.getElementById("produkInput");   // <input id="produkInput">
  const previewProduk = document.getElementById("previewProduk"); // <span id="previewProduk">
  const temaSelect = document.getElementById("temaSelect");     // <select id="temaSelect"><option value="#fff">...</select>

  if (produkInput && previewProduk) {
    produkInput.addEventListener("keyup", () => {
      previewProduk.textContent = produkInput.value;
    });
  }
  if (temaSelect) {
    temaSelect.addEventListener("change", () => {
      document.body.style.backgroundColor = temaSelect.value;
    });
  }
  // Memberi tahu mahasiswa bahwa script berhasil di-load
  alert('Selamat datang di Website Profil UMKM Anda!');
  // Menampilkan informasi variabel di console
  const namaUMKM = 'Kopi Nusantara';
  console.log('Nama UMKM:', namaUMKM);
  // Demonstrasi variabel dan operator
  let produk = 3;
  console.log('Jumlah produk saat ini:', produk);
  produk += 2;
  console.log('Setelah penambahan:', produk);
  document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('hasil-rating');
  if (!el) return;

  const rating = Number(el.dataset.value || 0); // ambil dari data-value
  let label = "★ Tidak Direkomendasikan";
  if (rating >= 4.5) label = "★★★★★ Sangat Disarankan";
  else if (rating >= 3) label = "★★★ Rekomendasi Biasa";

  el.textContent = label;
  });
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("formKontak");
      const nama = document.getElementById("nama");
      const email = document.getElementById("email");
      const pesan = document.getElementById("pesan");
      const errorMsg = document.getElementById("errorMsg");

      form.addEventListener("submit", function (e) {
        e.preventDefault(); // mencegah reload halaman
        if (nama.value === "" || email.value === "" || pesan.value === "") {
          errorMsg.textContent = "Semua field harus diisi.";
        } else {
          errorMsg.textContent = "";
          alert("Pesan berhasil dikirim!");
          form.reset();
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    // 1) Klik tombol "Beli Sekarang" → tampilkan alert + isi nama produk
    document.querySelectorAll(".btn-beli").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const namaProduk = this.dataset.produk || "";
        const alertEl = document.getElementById("alert-beli");
        if (!alertEl) return;
        alertEl.classList.remove("d-none");
        alertEl.textContent = "Terima kasih, pesanan untuk " + namaProduk + " sudah tercatat!";

        // scroll ke alert dengan offset ~80px
        const top = alertEl.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    // 2) Hover pada gambar produk → kasih efek border & shadow
    document.querySelectorAll(".card-img-top").forEach((img) => {
      img.addEventListener("mouseenter", () => {
        img.classList.add("border", "border-primary", "shadow");
      });
      img.addEventListener("mouseleave", () => {
        img.classList.remove("border", "border-primary", "shadow");
      });
    });

    // 3) Klik link nav → ganti .active
    document.querySelectorAll(".navbar .nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        document.querySelectorAll(".navbar .nav-link").forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });
  // Event klik tombol beli pakai jQuery
$(document).ready(function () {
  $(".btn-beli").on("click", function (e) {
    e.preventDefault(); // supaya nggak reload halaman

    const namaProduk = $(this).data("produk");
    alert("Terima kasih, " + namaProduk + " akan segera diproses!");
  });
});


//  document.addEventListener("DOMContentLoaded", function () {
//   const checkboxLangganan = document.getElementById("langganan");

//   if (checkboxLangganan) {
//     checkboxLangganan.addEventListener("change", function () {
//       if (this.checked) {
//         alert("Terima kasih telah berlangganan newsletter!");
//       }
//     });
//   }


//});
// script.js
// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("formKontak");
//   const checkboxLangganan = document.getElementById("langganan");

//   // --- alert saat form disubmit
//   form?.addEventListener("submit", function (e) {
//     e.preventDefault();
//     alert("Pesan berhasil dikirim!");
//     form.reset();
//   });

//   // --- alert saat newsletter dicentang
//   checkboxLangganan?.addEventListener("change", function () {
//     if (this.checked) {
//       alert("Terima kasih telah berlangganan newsletter!");
//     } else {
//       alert("Langganan newsletter dibatalkan.");
//     }
//   });
// });

})();
