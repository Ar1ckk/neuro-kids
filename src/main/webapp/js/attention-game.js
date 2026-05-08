let score = 0;
let hits = 0;
let misses = 0;
let gameActive = false;
let timer = 0;
let timerInterval = null;
let targetTimeout = null;
let currentDifficulty = 'easy';
let gameTime = 60; // 60 секунд игра

// Настройки для разных уровней сложности
const difficultySettings = {
    easy: {
        targetSpeed: 1500,    // Цель появляется каждые 1.5 секунды
        targetVisibleTime: 1200, // Цель видна 1.2 секунды
        pointsPerHit: 10
    },
    medium: {
        targetSpeed: 1000,    // Цель появляется каждую секунду
        targetVisibleTime: 800,  // Цель видна 0.8 секунды
        pointsPerHit: 20
    },
    hard: {
        targetSpeed: 700,     // Цель появляется каждые 0.7 секунды
        targetVisibleTime: 500,  // Цель видна 0.5 секунды
        pointsPerHit: 30
    }
};

let targetInterval = null;
let currentTarget = null;

// DOM элементы
const scoreElement = document.getElementById('score');
const hitsElement = document.getElementById('hits');
const missesElement = document.getElementById('misses');
const timerElement = document.getElementById('timer');
const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const gameMessage = document.getElementById('gameMessage');
const startBtn = document.getElementById('startBtn');

// Инициализация
function initGame() {
    score = 0;
    hits = 0;
    misses = 0;
    timer = 0;
    gameActive = false;

    updateStats();
    updateTimer();

    if (target) target.style.display = 'none';
    if (gameMessage) gameMessage.style.display = 'flex';

    if (targetInterval) clearInterval(targetInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (targetTimeout) clearTimeout(targetTimeout);
}

// Начать игру
function startGame() {
    if (gameActive) return;

    // Скрываем сообщение об окончании
    document.getElementById('gameOverMessage').style.display = 'none';

    // Сбрасываем все значения
    initGame();

    gameActive = true;
    if (gameMessage) gameMessage.style.display = 'none';

    // Запускаем таймер
    timerInterval = setInterval(() => {
        if (gameActive && timer < gameTime) {
            timer++;
            updateTimer();
        } else if (timer >= gameTime) {
            endGame();
        }
    }, 1000);

    // Запускаем появление целей
    startTargetSpawning();

    // Меняем текст кнопки
    if (startBtn) startBtn.textContent = '⏸ Игра идет...';
}

// Запуск появления целей
function startTargetSpawning() {
    const settings = difficultySettings[currentDifficulty];

    targetInterval = setInterval(() => {
        if (gameActive) {
            showTarget();
        }
    }, settings.targetSpeed);
}

// Показать цель в случайном месте
function showTarget() {
    if (!gameActive) return;

    const settings = difficultySettings[currentDifficulty];
    const gameAreaRect = gameArea.getBoundingClientRect();

    // Случайная позиция (с отступами)
    const maxX = gameAreaRect.width - 80;
    const maxY = gameAreaRect.height - 80;
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);

    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.style.display = 'flex';
    target.style.position = 'absolute';

    // Добавляем обработчик клика
    target.onclick = hitTarget;

    // Автоматически скрываем цель через заданное время
    if (targetTimeout) clearTimeout(targetTimeout);
    targetTimeout = setTimeout(() => {
        if (target.style.display === 'flex' && gameActive) {
            missTarget();
        }
    }, settings.targetVisibleTime);
}

// Попадание по цели
function hitTarget(e) {
    e.stopPropagation();
    if (!gameActive) return;

    const settings = difficultySettings[currentDifficulty];

    hits++;
    score += settings.pointsPerHit;

    updateStats();

    // Скрываем цель
    target.style.display = 'none';
    if (targetTimeout) clearTimeout(targetTimeout);

    // Эффект попадания
    createHitEffect(e.clientX, e.clientY);
}

// Промах
function missTarget() {
    if (!gameActive) return;

    misses++;
    updateStats();

    target.style.display = 'none';
}

// Создать эффект попадания
function createHitEffect(x, y) {
    const effect = document.createElement('div');
    effect.innerHTML = '✨';
    effect.style.position = 'fixed';
    effect.style.left = (x - 20) + 'px';
    effect.style.top = (y - 20) + 'px';
    effect.style.fontSize = '40px';
    effect.style.pointerEvents = 'none';
    effect.style.animation = 'popIn 0.3s ease forwards';
    document.body.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 300);
}

// Обновить статистику
function updateStats() {
    scoreElement.textContent = score;
    hitsElement.textContent = hits;
    missesElement.textContent = misses;
}

// Обновить таймер
function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Закончить игру
function endGame() {
    gameActive = false;

    // Останавливаем все интервалы
    if (targetInterval) clearInterval(targetInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (targetTimeout) clearTimeout(targetTimeout);

    // Скрываем цель
    target.style.display = 'none';

    // Меняем текст кнопки
    if (startBtn) startBtn.textContent = '▶ Начать игру';

    // Рассчитываем точность
    const total = hits + misses;
    const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;

    // Показываем результат
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalHits').textContent = hits;
    document.getElementById('finalMisses').textContent = misses;
    document.getElementById('finalAccuracy').textContent = accuracy;
    document.getElementById('gameOverMessage').style.display = 'flex';

    // Сохраняем результат
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && typeof updateUserStats === 'function') {
        // Добавляем бонус за точность
        let bonusPoints = 0;
        if (accuracy >= 90) bonusPoints = 100;
        else if (accuracy >= 70) bonusPoints = 50;
        else if (accuracy >= 50) bonusPoints = 25;

        const totalPoints = score + bonusPoints;

        updateUserStats({
            points: totalPoints,
            gameType: 'attention',
            difficulty: currentDifficulty,
            accuracy: accuracy
        });
    }
}

// Перезапустить игру
function restartGame() {
    if (targetInterval) clearInterval(targetInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (targetTimeout) clearTimeout(targetTimeout);

    initGame();

    if (gameMessage) gameMessage.style.display = 'flex';
    if (startBtn) startBtn.textContent = '▶ Начать игру';
    document.getElementById('gameOverMessage').style.display = 'none';
}

// Сменить сложность
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

// Вернуться к играм
function goBack() {
    window.location.href = 'games.html';
}

// Обработчики для кнопок сложности
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (gameActive) {
            if (confirm('Игра идет! Начать заново с новой сложностью?')) {
                changeDifficulty(btn.dataset.difficulty);
            }
        } else {
            changeDifficulty(btn.dataset.difficulty);
        }
    });
});

// Инициализируем игру
initGame();