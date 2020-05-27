const tabLink = document.querySelectorAll('.feature__tab-link'),
    tabContent = document.querySelectorAll('.feature__tab-content');

tabLink.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        removeAllActiveLink();
        link.classList.add('active');
        removeAllActiveContent();
        document.getElementById(link.dataset.show).classList.add("active");
    })
});

function removeAllActiveLink() {
    tabLink.forEach(function (link) {
        link.classList.remove('active');
    })
}

function removeAllActiveContent() {
    tabContent.forEach(function (content) {
        content.classList.remove('active');
    })
}