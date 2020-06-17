const body = document.querySelector('body'),
    modalOpenTrigger = document.getElementById("modal-trigger"),
    modalCloseModal = document.getElementById("close-modal"),
    main = document.querySelector(".main"),
    gameScore = document.getElementById("gameScore");

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
const score = JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_SCORE")) ? JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_SCORE")) : { data: 0 };
let state = {
    score: score.data,
    result: false,
    winner: ""
}

let view = {
    renderStartView: () => {
        main.innerHTML = '';
        main.innerHTML =
            `
        <div class="start-view">
            <div class="two-choice">
                <div class="paper choice-option" data-choice="paper" onClick="controller.startGame('paper')">
                    <img src="./images/icon-paper.svg" alt="">
                </div>
                <div class="scissors choice-option" data-choice="scissors" onClick="controller.startGame('scissors')">
                    <img src="./images/icon-scissors.svg" alt="">
                </div>
            </div>
            <div class="rock choice-option" data-choice="rock" onClick="controller.startGame('rock')">
                <img src="./images/icon-rock.svg" alt="">
            </div>
        </div> `;
    },
    renderPlayView: (choice) => {
        main.innerHTML = '';
        main.innerHTML = `
        <div class="play-view">
            <div class="player">
                <h3 class="title title__small">YOU PICKED</h3>
                <div class="choice ${choice}">
                    <img src="./images/icon-${choice}.svg" alt="">
                </div>
            </div>
            <div class="result">
                <h2 class="title title__large"></h2>
                <a href="#" class="btn btn__primary" onClick="view.renderStartView()">PLAY AGAIN</a>
            </div>
            <div class="house">
                <h3 class="title title__small">THE HOUSE PICKED</h3>
                <div class="choice wait">
                </div>
            </div>
        </div>`;
        const houseChoiceEle = document.querySelector('.house .choice');
        setTimeout(() => {
            houseChoiceEle.classList.remove("wait");
            houseChoiceEle.innerHTML = '';
            const houseChoice = controller.getHouseChoice();
            houseChoiceEle.classList.add(houseChoice);
            houseChoiceEle.innerHTML = `<img src="./images/icon-${houseChoice}.svg" alt="">`
            const winner = controller.getWinner(choice, houseChoice);
            if (winner !== 0) {
                document.querySelector(`.play-view .${winner}`).classList.add('winner');
                setTimeout(() => {
                    if (winner == 'player') {
                        state.score += 1;
                        localStorage.setItem("ROCK_PAPER_SCISSORS_SCORE", JSON.stringify({ data: state.score }));
                        document.querySelector('.play-view .result .title').textContent = 'YOU WIN';
                    }
                    else {
                        state.score -= 1;
                        localStorage.setItem("ROCK_PAPER_SCISSORS_SCORE", JSON.stringify({ data: state.score }));
                        document.querySelector('.play-view .result .title').textContent = 'YOU LOSE';
                    }
                    gameScore.textContent = state.score;
                    document.querySelector('.play-view').classList.add("result");
                }, 500)
            }
            else {
                document.querySelector('.play-view .result .title').textContent = "IT'S A TIE";
                document.querySelector('.play-view').classList.add("result");
            }
        }, 1000)
    }
}

let controller = {
    startGame: (choice) => {
        view.renderPlayView(choice);
    },
    getHouseChoice: () => {
        const choice = ['paper', 'scissors', 'rock'];
        return choice[Math.floor(Math.random() * 3)];
    },
    getWinner(player, house) {
        if (player == house) {
            return 0;
        }
        else if (player == 'rock' && house == 'paper') {
            return 'house';
        }
        else if (player == 'paper' && house == 'rock') {
            return 'player';
        }
        else if (player == 'rock' && house == 'scissors') {
            return 'player';
        }
        else if (player == 'scissors' && house == 'rock') {
            return 'house';
        }
        else if (player == 'paper' && house == 'scissors') {
            return 'house';
        }
        else if (player == 'scissors' && house == 'paper') {
            return 'player';
        }
    },
    init: () => {
        gameScore.textContent = state.score;
        view.renderStartView();
    }
}

controller.init();