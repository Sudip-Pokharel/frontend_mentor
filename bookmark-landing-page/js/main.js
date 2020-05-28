const tabLink = document.querySelectorAll('.feature__tab-link'),
    tabContent = document.querySelectorAll('.feature__tab-content'),
    faqLink = document.querySelectorAll('a.faq__link'),
    inputWrapper = document.querySelector('.input__wrapper'),
    checkEmailBtn = document.getElementById("contact__us-btn"),
    inputEmail = document.getElementById("email__input");

tabLink.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        removeAllActiveLink(tabLink);
        link.classList.add('active');
        removeAllActiveContent();
        document.getElementById(link.dataset.show).classList.add("active");
    })
});

function removeAllActiveLink(element) {
    element.forEach(function (link) {
        link.classList.remove('active');
    })
}

function removeAllActiveContent() {
    tabContent.forEach(function (content) {
        content.classList.remove('active');
    })
}

faqLink.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        if (!link.classList.contains('active')) {
            removeAllActiveLink(faqLink);
            link.classList.add('active');
        }
        else {
            removeAllActiveLink(faqLink);
        }
    })
})

checkEmailBtn.addEventListener('click', function (e) {
    e.preventDefault();
    ValidateEmail(inputEmail.value)
})

function ValidateEmail(input) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
        inputWrapper.classList.remove("error");
        inputEmail.focus();
        return true;
    }
    else {
        inputWrapper.classList.add("error");
        inputEmail.focus();
        return false;
    }
}