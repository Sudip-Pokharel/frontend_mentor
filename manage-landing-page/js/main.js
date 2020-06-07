const sliderBox = document.querySelector(".slider__list"),
    submitBtn = document.getElementById("submitBtn"),
    emailInput = document.getElementById("emailInput");
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

submitBtn.addEventListener('click', checkEmailInput);

function checkEmailInput(e) {
    e.preventDefault();
    emailInput.parentElement.classList.remove("error");
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailInput.value == '' || !emailInput.value.match(mailformat)) {
        emailInput.parentElement.classList.add("error");
    }

}

