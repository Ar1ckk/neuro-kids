// Картинки для карточек (эмодзи)
const cardValues = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
    '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'
];

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

// Размеры для разных уровней
const difficultySettings = {
    easy: { rows: 3, cols: 4, totalPairs: 6 },
    medium: { rows: 4, cols: 4, totalPairs: 8 },
    hard: { rows: 4, cols: 6, totalPairs: 12 }
};

// Инициализация игры
function initGame() {
    const settings = difficultySettings[currentDifficulty];
    const totalCards = settings.totalPairs * 2;

    // Берем нужное количество пар карточек
    let gameCards = [];
    for (let i = 0; i < settings.totalPairs; i++) {
        gameCards.push(cardValues[i]);
        gameCards.push(cardValues[i]);
    }

    // Перемешиваем карточки
    gameCards = shuffle(gameCards);

    // Создаем карточки
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

    // Сбрасываем и запускаем таймер
    if (timerInterval) clearInterval(timerInterval);
    timer = 0;
    updateTimer();
    timerInterval = setInterval(() => {
        if (gameActive && matchedPairs < settings.totalPairs) {
            timer++;
            updateTimer();
        }
    }, 1000);
}

// Перемешивание массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Отрисовка доски
function renderBoard() {
    const settings = difficultySettings[currentDifficulty];
    gameBoard.className = `game-board ${currentDifficulty}`;

    let html = '';
    cards.forEach(card => {
        let cardClass = 'card';
        if (card.flipped || card.matched) cardClass += ' flipped';
        if (card.matched) cardClass += ' matched';

        html += `
            <div class="${cardClass}" onclick="handleCardClick(${card.id})">
                <div class="card-content">${card.flipped || card.matched ? card.value : '?'}</div>
            </div>
        `;
    });

    gameBoard.innerHTML = html;
}

// Обработка клика по карточке
function handleCardClick(cardId) {
    if (lockBoard || !gameActive) return;

    const card = cards[cardId];
    if (card.matched || card.flipped) return;

    // Переворачиваем карточку
    card.flipped = true;
    flippedCards.push(cardId);
    renderBoard();

    // Проверяем пару
    if (flippedCards.length === 2) {
        lockBoard = true;
        attempts++;
        updateStats();

        const card1 = cards[flippedCards[0]];
        const card2 = cards[flippedCards[1]];

        if (card1.value === card2.value) {
            // Нашли пару!
            setTimeout(() => {
                card1.matched = true;
                card2.matched = true;
                matchedPairs++;
                updateStats();

                flippedCards = [];
                lockBoard = false;
                renderBoard();

                // Проверяем победу
                const settings = difficultySettings[currentDifficulty];
                if (matchedPairs === settings.totalPairs) {
                    gameWin();
                }
            }, 300);
        } else {
            // Не нашли пару
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

// Обновление статистики
function updateStats() {
    pairsFoundElement.textContent = matchedPairs;
    attemptsElement.textContent = attempts;
}

// Обновление таймера
function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Победа!
function gameWin() {
    if (timerInterval) clearInterval(timerInterval);
    gameActive = false;

    // Расчет очков
    const settings = difficultySettings[currentDifficulty];
    let points = 0;

    // База за уровень
    if (currentDifficulty === 'easy') points = 100;
    else if (currentDifficulty === 'medium') points = 200;
    else points = 300;

    // Бонус за попытки
    const expectedAttempts = settings.totalPairs * 2;
    if (attempts <= expectedAttempts) points += 50;
    if (attempts <= settings.totalPairs) points += 100;

    // Бонус за время
    const expectedTime = settings.totalPairs * 5;
    if (timer <= expectedTime) points += 50;

    // Показываем окно победы
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('finalAttempts').textContent = attempts;
    document.getElementById('finalTime').textContent = timeString;
    document.getElementById('finalPoints').textContent = points;
    document.getElementById('winMessage').style.display = 'flex';

    // Сохраняем результат в прогресс
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && typeof updateUserStats === 'function') {
        updateUserStats({
            points: points,
            gameType: 'memory',
            difficulty: currentDifficulty
        });
    }
}

// Перезапуск игры
function restartGame() {
    if (timerInterval) clearInterval(timerInterval);
    document.getElementById('winMessage').style.display = 'none';
    initGame();
}

// Смена сложности
function changeDifficulty(difficulty) {
    currentDifficulty = difficulty;

    // Обновляем активную кнопку
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });

    restartGame();
}

// Возврат к играм
function goBack() {
    window.location.href = 'games.html';
}

// Обработчики для кнопок сложности
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        changeDifficulty(btn.dataset.difficulty);
    });
});

// Запускаем игру
initGame();