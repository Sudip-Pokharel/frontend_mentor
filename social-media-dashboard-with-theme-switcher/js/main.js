const body = document.querySelector("body"),
    trigger = document.getElementById("theme__trigger"),
    checkBox = document.getElementById("theme__switcher");

checkBox.addEventListener("change", changeTheme);

function changeTheme() {
    if (checkBox.checked) {
        body.classList.remove('light__mode');
    }
    else {
        body.classList.add('light__mode');
    }
}