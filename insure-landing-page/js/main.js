const menu__open = document.querySelector('.menu__open--trigger'),
    menu__close = document.querySelector('.menu__close--trigger'),
    body = document.querySelector('body'),
    header = document.querySelector('.header');


menu__open.addEventListener('click', openMenu);
menu__close.addEventListener('click', closeMenu);

function openMenu(e) {
    e.preventDefault();
    header.classList.add('menu-open');
    body.classList.add('overflow__hidden')
}

function closeMenu(e) {
    e.preventDefault();
    header.classList.remove('menu-open');
    body.classList.remove('overflow__hidden')
}
