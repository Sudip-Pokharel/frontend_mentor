const body = document.querySelector('body'),
    triggerOpen = document.querySelector('.menu__trigger--open'),
    triggerclose = document.querySelector('.menu__trigger--close');

triggerOpen.addEventListener('click', menuOpen);
triggerclose.addEventListener('click', menuClose);

function menuOpen() {
    body.classList.add('menu__open');
}

function menuClose() {
    body.classList.remove('menu__open');
}