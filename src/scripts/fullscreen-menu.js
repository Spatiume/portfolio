const humburgerMenu = document.querySelector(".hamburger-menu");
const closeBtn = document.querySelector(".fullscreen-menu__close");
const fullscreenMenu = document.querySelector(".fullscreen-menu");


humburgerMenu.addEventListener("click", function (e) {
  e.preventDefault();
  fullscreenMenu.classList.add("active");
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fullscreenMenu.classList.remove("active");
});

const menuLinks = document.querySelectorAll('.menu__link');
for (let menuLink of menuLinks) {
    menuLink.addEventListener('click', function (e) {
        e.preventDefault();
        fullscreenMenu.classList.remove("active");
    });
};