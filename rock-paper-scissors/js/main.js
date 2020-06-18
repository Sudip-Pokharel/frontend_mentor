const body = document.querySelector('body'),
    headerTitle = document.querySelector(".header .title.title__main"),
    modalOpenTrigger = document.getElementById("modal-trigger"),
    modalCloseModal = document.getElementById("close-modal"),
    main = document.querySelector(".main"),
    gameScore = document.getElementById("gameScore"),
    modalImage = document.querySelector(".modal__image"),
    bonusTriggerInput = document.getElementById("bonus-trigger-input"),
    bonusTrigger = document.getElementById("bonus-trigger-btn");

modalOpenTrigger.addEventListener("click", openModal);
modalCloseModal.addEventListener("click", closeModal);
bonusTrigger.addEventListener('click', changeGameType);

function openModal(e) {
    e.preventDefault();
    body.classList.add("modal-open");
}

function closeModal(e) {
    e.preventDefault();
    body.classList.remove("modal-open");
}


function changeGameType() {
    if (bonusTriggerInput.checked) {
        console.log(2)
        state.score = scoreBonus.data;
        state.bonus = true;
        localStorage.setItem("GAME_PLAY_TYPE", JSON.stringify({ type: 1 }));
    }
    else {
        console.log(3)
        state.score = scoreOrginal.data;
        state.bonus = false;
        localStorage.setItem("GAME_PLAY_TYPE", JSON.stringify({ type: 0 }));
    }
    console.log(123)
    controller.init();
}

const scoreOrginal = JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_SCORE")) ? JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_SCORE")) : { data: 0 };
const scoreBonus = JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_LIZARD_SPOCK_SCORE")) ? JSON.parse(localStorage.getItem("ROCK_PAPER_SCISSORS_LIZARD_SPOCK_SCORE")) : { data: 0 };
const gamePlay = JSON.parse(localStorage.getItem("GAME_PLAY_TYPE")) ? JSON.parse(localStorage.getItem("GAME_PLAY_TYPE")) : { type: 0 };
let state = {
    score: gamePlay.type ? scoreBonus.data : scoreOrginal.data,
    bonus: gamePlay.type ? true : false
}

let view = {
    renderStartView: () => {
        main.innerHTML = '';
        if (!state.bonus) {
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
        }
        else {
            main.innerHTML =
                `
            <div class="start-view bonus">
            <div class="scissors choice-option" onClick="controller.startGame('scissors')">
              <img src="./images/icon-scissors.svg" alt="">
            </div>
            <div class="two-choice-1">
              <div class="spock choice-option" onClick="controller.startGame('spock')">
                <img src="./images/icon-spock.svg" alt="">
              </div>
              <div class="paper choice-option" onClick="controller.startGame('paper')">
                <img src="./images/icon-paper.svg" alt="">
              </div>
            </div>
            <div class="two-choice-2">
              <div class="lizard choice-option" onClick="controller.startGame('lizard')">
                <img src="./images/icon-lizard.svg" alt="">
              </div>
              <div class="rock choice-option" onClick="controller.startGame('rock')">
                <img src="./images/icon-rock.svg" alt="">
              </div>
            </div>
          </div>`;
        }
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
        if (!state.bonus) {
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
        else {
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
                            localStorage.setItem("ROCK_PAPER_SCISSORS_LIZARD_SPOCK_SCORE", JSON.stringify({ data: state.score }));
                            document.querySelector('.play-view .result .title').textContent = 'YOU WIN';
                        }
                        else {
                            state.score -= 1;
                            localStorage.setItem("ROCK_PAPER_SCISSORS_LIZARD_SPOCK_SCORE", JSON.stringify({ data: state.score }));
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
}

let controller = {
    startGame: (choice) => {
        view.renderPlayView(choice);
    },
    getHouseChoice: () => {
        if (state.bonus) {
            const choice = ['paper', 'scissors', 'rock', 'spock', 'lizard'];
            return choice[Math.floor(Math.random() * 5)];
        }
        else {
            const choice = ['paper', 'scissors', 'rock'];
            return choice[Math.floor(Math.random() * 3)];
        }

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
        else if (player == 'rock' && house == 'lizard') {
            return 'player';
        }
        else if (player == 'lizard' && house == 'rock') {
            return 'house';
        }
        else if (player == 'lizard' && house == 'spock') {
            return 'player';
        }
        else if (player == 'spock' && house == 'lizard') {
            return 'house';
        }
        else if (player == 'spock' && house == 'scissors') {
            return 'player';
        }
        else if (player == 'scissors' && house == 'spock') {
            return 'house';
        }
        else if (player == 'scissors' && house == 'lizard') {
            return 'player';
        }
        else if (player == 'lizard' && house == 'scissors') {
            return 'house';
        }
        else if (player == 'paper' && house == 'spock') {
            return 'player';
        }
        else if (player == 'spock' && house == 'paper') {
            return 'house';
        }
        else if (player == 'lizard' && house == 'paper') {
            return 'player';
        }
        else if (player == 'paper' && house == 'lizard') {
            return 'house';
        }
        else if (player == 'spock' && house == 'rock') {
            return 'player';
        }
        else if (player == 'rock' && house == 'spock') {
            return 'house';
        }


    },
    init: () => {
        gameScore.textContent = state.score;
        bonusTriggerInput.checked = state.bonus;
        if (state.bonus) {
            headerTitle.classList.add("bonus");
            headerTitle.innerHTML = `
            <span>ROCK</span>
            <span>PAPER</span>
            <span>SCISSORS</span>
            <span>LIZARD</span>
            <span>SPOCK</span>
            `;
            bonusTrigger.innerHTML = 'PLAY ORGINAL'
            modalImage.innerHTML = `
            <img src="./images/image-rules-bonus.svg" alt="">
            `
        }
        else {
            headerTitle.classList.remove("bonus");
            headerTitle.innerHTML = `
            <span>ROCK</span>
            <span>PAPER</span>
            <span>SCISSORS</span>
            `;
            bonusTrigger.innerHTML = 'PLAY BONUS'
            modalImage.innerHTML = `
            <img src="./images/image-rules.svg" alt="">
            `;
        }
        view.renderStartView();
    }
}

controller.init();
bonusTriggerInput.checked = !bonusTriggerInput.checked;