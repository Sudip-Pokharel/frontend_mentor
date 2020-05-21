const body = document.querySelector("body"),
    burgerIcon = document.querySelector(".burger__icon"),
    closeIcon = document.querySelector(".close__icon");


burgerIcon.addEventListener("click", openMenu);
closeIcon.addEventListener('click', closeMenu);

function openMenu(e) {
    e.preventDefault();
    body.classList.add("menu__open");
}

function closeMenu(e) {
    e.preventDefault();
    body.classList.remove("menu__open");
}