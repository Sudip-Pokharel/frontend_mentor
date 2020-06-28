const shareBtn = document.getElementById("shareBtn"),
    sharePopup = document.querySelector(".share-popup");

shareBtn.addEventListener('change', changeSharePopup);

function changeSharePopup(e) {
    sharePopup.classList.remove('show');
    if (e.target.checked) {
        sharePopup.classList.add('show');
    }
}