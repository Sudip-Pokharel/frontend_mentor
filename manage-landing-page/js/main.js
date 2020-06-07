const sliderBox = document.querySelector(".slider__list");
let sliderNumber = 2;

setInterval(function () {
    removeActiveClass();
    sliderBox.classList.add(`slider__list--show-${sliderNumber}`);
    sliderNumber++;
    if (sliderNumber == 5) {
        sliderNumber = 1;
    }
}, 5000);

function removeActiveClass() {
    for (let i = 0; i < 5; i++) {
        sliderBox.classList.remove(`slider__list--show-${i}`);
    }
}