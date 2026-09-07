// --- MOBILNÍ NAVIGACE ---
const menu = document.querySelector(".maxa-nav-wrap");
const hamburger = document.querySelector(".maxa-hamburger-btn");
const menuItems = document.querySelectorAll(".maxa-nav-link");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("showMenu");
        hamburger.classList.toggle("is-active");
    });
    
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                menu.classList.remove("showMenu");
                hamburger.classList.remove("is-active");
            }
        });
    });
}