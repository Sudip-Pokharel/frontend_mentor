const notifyButton = document.getElementById("notifyButton"),
    emailInput = document.getElementById("emailInput"),
    errorMessage = document.querySelector(".error__message");

notifyButton.addEventListener('click', checkEmail);

function checkEmail(e) {
    e.preventDefault();
    emailInput.parentElement.classList.remove("error");
    errorMessage.innerHTML = "";
    if (emailInput.value == '') {
        errorMessage.innerHTML = "Whoops! It looks like you forgot to add your email";
        emailInput.parentElement.classList.add("error");
    }
    else {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailInput.value.match(mailformat)) {
            errorMessage.innerHTML = "Please provide a valid email address";
            emailInput.parentElement.classList.add("error");
        }
    }
}