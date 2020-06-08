const sliderBox = document.querySelector(".slider__list"),
    slideitem = document.querySelectorAll(".slider__list-item"),
    submitBtn = document.getElementById("submitBtn"),
    emailInput = document.getElementById("emailInput"),
    paginationLink = document.querySelectorAll(".pagination-link"),
    body = document.querySelector("body"),
    triggerMenuOpen = document.getElementById("trigger-menu--open"),
    triggerMenuClose = document.getElementById("trigger-menu--close");
let sliderNumber = 2;


submitBtn.addEventListener('click', checkEmailInput);
triggerMenuOpen.addEventListener('click', menuOpen);
triggerMenuClose.addEventListener('click', menuClose);


setInterval(function () {
    removeActiveClass();
    sliderBox.classList.add(`slider__list--show-${sliderNumber}`);
    sliderNumber++;
    if (sliderNumber == slideitem.length + 1) {
        sliderNumber = 1;
    }
}, 5500);

function removeActiveClass() {
    for (let i = 0; i < slideitem.length + 1; i++) {
        sliderBox.classList.remove(`slider__list--show-${i}`);
    }
}

function checkEmailInput(e) {
    e.preventDefault();
    emailInput.parentElement.classList.remove("error");
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailInput.value == '' || !emailInput.value.match(mailformat)) {
        emailInput.parentElement.classList.add("error");
    }
}

for (let i = 0; i < paginationLink.length; i++) {
    paginationLink[i].addEventListener('click', function (e) {
        e.preventDefault();
        removeActiveClass();
        sliderBox.classList.add(`slider__list--show-${i + 1}`);
        sliderNumber = i + 1;
    })
}

function menuOpen(e) {
    e.preventDefault();
    body.classList.add("menu--open");
}

function menuClose(e) {
    e.preventDefault();
    body.classList.remove("menu--open");
}
