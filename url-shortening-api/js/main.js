const shortenBtn = document.getElementById("shortenBtn"),
    shortenInput = document.getElementById("shortenInput"),
    shortenLinkBox = document.querySelector(".shorten-links");

let loading = false;
let allLinks = []

shortenBtn.addEventListener("click", handleShortenLink);


function handleShortenLink(e) {
    e.preventDefault();
    if (!loading) {
        shortenInput.parentElement.classList.remove("error");
        shortenInput.parentElement.classList.remove("error-url");
        if (shortenInput.value == '') {
            shortenInput.parentElement.classList.add("error");
        }
        else {
            waitingState();
            const data = { url: shortenInput.value }
            fetch('https://rel.ink/api/links/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.status == '400') {
                        shortenInput.parentElement.classList.add("error-url");
                    } return response.json()
                })
                .then(data => {
                    shortenInput.value = "";
                    normalState();
                    addNewLink(data)
                })
                .catch((error) => {
                    normalState();
                    alert("Error" + error);
                });
        }
    }
}

function waitingState() {
    loading = true;
    shortenBtn.classList.add('disable-btn')
    shortenBtn.textContent = "Please Wait..."
}

function normalState() {
    loading = false;
    shortenBtn.classList.remove('disable-btn')
    shortenBtn.textContent = "Shorten It!"
}

function addNewLink(data) {
    if (data.hashid) {
        allLinks.unshift(data);
        localStorage.setItem("SHORTEN_LINK", JSON.stringify(allLinks.slice(0, 3)));
        createLinksItem(data);
    }
}

function createLinksItem(link) {
    let li = document.createElement("li");
    li.className = "links-item";
    li.innerHTML = `
        <span class="enter-link">
            ${link.url}
        </span>
        <div class="generated-box">
            <span class="generated-link">https://rel.ink/${link.hashid}</span>
            <a  class="btn btn__primary shorten copy" onclick="copyLink(this)">Copy</a>
        </div>`;
    shortenLinkBox.appendChild(li);
}

function copyLink(ele) {
    const link = ele.parentElement.querySelector(".generated-link").textContent;
    let input = document.createElement("input");
    input.value = link;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(input);
}

function onInit() {
    allLinks = JSON.parse(localStorage.getItem("SHORTEN_LINK")) ? JSON.parse(localStorage.getItem("SHORTEN_LINK")) : [];
    if (allLinks) {
        allLinks.forEach(link => {
            createLinksItem(link);
        });
    }
}

onInit();