const body = document.querySelector('body'),
    modalOpenTrigger = document.getElementById("modal-trigger"),
    modalCloseModal = document.getElementById("close-modal");

modalOpenTrigger.addEventListener("click", openModal);
modalCloseModal.addEventListener("click", closeModal);

function openModal(e) {
    e.preventDefault();
    body.classList.add("modal-open");
}
function closeModal(e) {
    e.preventDefault();
    body.classList.remove("modal-open");
}