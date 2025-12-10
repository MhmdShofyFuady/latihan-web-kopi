document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("langganan");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
         alert("Terima kasih telah berlangganan!");
        } else {
         alert("Langganan dibatalkan.");
        }
    });
});