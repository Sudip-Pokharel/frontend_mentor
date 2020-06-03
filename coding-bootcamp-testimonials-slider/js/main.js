const nextBtn = document.querySelectorAll(".nav__next"),
    prevBtn = document.querySelectorAll(".nav__prev"),
    container = document.querySelector(".container");


nextBtn.forEach(function (each) {
    each.addEventListener("click", nextSlide);
})

prevBtn.forEach(function (each) {
    each.addEventListener("click", prevSlide);
})

function nextSlide() {
    container.classList.remove("show-1");
    container.classList.add("show-2");
}

function prevSlide() {
    container.classList.remove("show-2");
    container.classList.add("show-1");
}