const cardValues = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'];

let gameBoard = document.getElementById('gameBoard');
let pairsFoundElement = document.getElementById('pairsFound');
let attemptsElement = document.getElementById('attempts');
let timerElement = document.getElementById('timer');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let timer = 0;
let timerInterval = null;
let currentDifficulty = 'easy';
let gameActive = true;
let lockBoard = false;

const difficultySettings = {
    easy: { rows: 3, cols: 4, totalPairs: 6 },
    medium: { rows: 4, cols: 4, totalPairs: 8 },
    hard: { rows: 4, cols: 6, totalPairs: 12 }
};

function initGame() {
    const settings = difficultySettings[currentDifficulty];
    let gameCards = [];
    for (let i = 0; i < settings.totalPairs; i++) {
        gameCards.push(cardValues[i]);
        gameCards.push(cardValues[i]);
    }
    gameCards = shuffle(gameCards);

    cards = gameCards.map((value, index) => ({
        id: index,
        value: value,
        flipped: false,
        matched: false
    }));

    matchedPairs = 0;
    flippedCards = [];
    attempts = 0;
    gameActive = true;
    lockBoard = false;

    updateStats();
    renderBoard();

    if (timerInterval) clearInterval(timerInterval);
    timer = 0;
    updateTimer();
    timerInterval = setInterval(() => {
        if (gameActive && matchedPairs < settings.totalPairs) {
            timer++;
            updateTimer();
        }
    }, 1000);

    playSound('start');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderBoard() {
    const settings = difficultySettings[currentDifficulty];
    gameBoard.className = `game-board ${currentDifficulty}`;

    let html = '';
    cards.forEach(card => {
        let cardClass = 'card';
        if (card.flipped || card.matched) cardClass += ' flipped';
        if (card.matched) cardClass += ' matched';

        html += `<div class="${cardClass}" onclick="handleCardClick(${card.id})">
                    <div class="card-content">${card.flipped || card.matched ? card.value : '?'}</div>
                </div>`;
    });
    gameBoard.innerHTML = html;
}

function handleCardClick(cardId) {
    if (lockBoard || !gameActive) return;

    const card = cards[cardId];
    if (card.matched || card.flipped) return;

    playSound('flip');

    card.flipped = true;
    flippedCards.push(cardId);
    renderBoard();

    if (flippedCards.length === 2) {
        lockBoard = true;
        attempts++;
        updateStats();

        const card1 = cards[flippedCards[0]];
        const card2 = cards[flippedCards[1]];

        if (card1.value === card2.value) {
            playSound('match');

            setTimeout(() => {
                card1.matched = true;
                card2.matched = true;
                matchedPairs++;
                updateStats();
                flippedCards = [];
                lockBoard = false;
                renderBoard();

                const settings = difficultySettings[currentDifficulty];
                if (matchedPairs === settings.totalPairs) {
                    gameWin();
                }
            }, 300);
        } else {
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                flippedCards = [];
                lockBoard = false;
                renderBoard();
            }, 1000);
        }
    }
}

function updateStats() {
    pairsFoundElement.textContent = matchedPairs;
    attemptsElement.textContent = attempts;
}

function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function gameWin() {
    if (timerInterval) clearInterval(timerInterval);
    gameActive = false;

    playSound('win');

    const settings = difficultySettings[currentDifficulty];
    let points = 0;
    if (currentDifficulty === 'easy') points = 100;
    else if (currentDifficulty === 'medium') points = 200;
    else points = 300;

    const expectedAttempts = settings.totalPairs * 2;
    if (attempts <= expectedAttempts) points += 50;
    if (attempts <= settings.totalPairs) points += 100;

    const expectedTime = settings.totalPairs * 5;
    if (timer <= expectedTime) points += 50;

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('finalAttempts').textContent = attempts;
    document.getElementById('finalTime').textContent = timeString;
    document.getElementById('finalPoints').textContent = points;
    document.getElementById('winMessage').style.display = 'flex';

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && typeof updateUserStats === 'function') {
        updateUserStats({ points: points, gameType: 'memory', difficulty: currentDifficulty });
    }
}

function restartGame() {
    if (timerInterval) clearInterval(timerInterval);
    document.getElementById('winMessage').style.display = 'none';
    initGame();
}

function changeDifficulty(difficulty) {
    currentDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) btn.classList.add('active');
    });
    restartGame();
}

function goBack() {
    window.location.href = 'games.html';
}

document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeDifficulty(btn.dataset.difficulty));
});

initGame();