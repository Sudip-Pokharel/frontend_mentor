const tabLink = document.querySelectorAll('.feature__tab-link'),
    tabContent = document.querySelectorAll('.feature__tab-content'),
    faqLink = document.querySelectorAll('a.faq__link');

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