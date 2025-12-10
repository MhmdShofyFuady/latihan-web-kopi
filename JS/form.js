import { formatPesan } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("nama").value;
        const kategori = document.getElementById("kategori").value;
        const pesan = document.getElementById("pesan").value;
        const hasil = formatPesan(nama, kategori, pesan);
        alert(hasil);
    });
});
