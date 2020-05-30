const allInput = document.querySelectorAll("#signup__form input"),
    submitBtn = document.getElementById("submit__btn");

submitBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    allInput.forEach(function (each) {
        if (each.value == '') {
            each.parentElement.classList.add("error");
        }
        else {
            if (each.type == 'email') {
                ValidateEmail(each);
            }
            else {
                each.parentElement.classList.remove("error");
            }
        }

    })
}

function ValidateEmail(input) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.value.match(mailformat)) {
        input.parentElement.classList.remove("error");
    }
    else {
        input.parentElement.classList.add("error");
    }
}