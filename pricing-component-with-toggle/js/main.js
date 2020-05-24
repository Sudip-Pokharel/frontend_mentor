const planToggle = document.getElementById("plan__toggle"),
    pricingBox = document.getElementById("pricing");

planToggle.addEventListener("change", changePlanView);

function changePlanView() {
    if (planToggle.checked) {
        pricingBox.classList.add('monthly__view')
    }
    else {
        pricingBox.classList.remove('monthly__view')
    }
}