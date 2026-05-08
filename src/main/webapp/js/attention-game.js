let score = 0;
let hits = 0;
let misses = 0;
let gameActive = false;
let timer = 0;
let timerInterval = null;
let targetTimeout = null;
let currentDifficulty = 'easy';
let gameTime = 60;
let targetInterval = null;

const difficultySettings = {
    easy: { targetSpeed: 1500, targetVisibleTime: 1200, pointsPerHit: 10 },
    medium: { targetSpeed: 1000, targetVisibleTime: 800, pointsPerHit: 20 },
    hard: { targetSpeed: 700, targetVisibleTime: 500, pointsPerHit: 30 }
};

const scoreElement = document.getElementById('score');
const hitsElement = document.getElementById('hits');
const missesElement = document.getElementById('misses');
const timerElement = document.getElementById('timer');
const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const gameMessage = document.getElementById('gameMessage');
const startBtn = document.getElementById('startBtn');

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

function startGame() {
    if (gameActive) return;
    document.getElementById('gameOverMessage').style.display = 'none';
    initGame();
    gameActive = true;
    if (gameMessage) gameMessage.style.display = 'none';

    playSound('start');

    timerInterval = setInterval(() => {
        if (gameActive && timer < gameTime) {
            timer++;
            updateTimer();
        } else if (timer >= gameTime) {
            endGame();
        }
    }, 1000);

    startTargetSpawning();
    if (startBtn) startBtn.textContent = '⏸ Игра идет...';
}

function startTargetSpawning() {
    const settings = difficultySettings[currentDifficulty];
    targetInterval = setInterval(() => {
        if (gameActive) showTarget();
    }, settings.targetSpeed);
}

function showTarget() {
    if (!gameActive) return;
    const settings = difficultySettings[currentDifficulty];
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - 80;
    const maxY = gameAreaRect.height - 80;
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.style.display = 'flex';
    target.onclick = hitTarget;
    if (targetTimeout) clearTimeout(targetTimeout);
    targetTimeout = setTimeout(() => {
        if (target.style.display === 'flex' && gameActive) missTarget();
    }, settings.targetVisibleTime);
}

function hitTarget(e) {
    e.stopPropagation();
    if (!gameActive) return;
    const settings = difficultySettings[currentDifficulty];
    hits++;
    score += settings.pointsPerHit;
    playSound('correct');
    updateStats();
    target.style.display = 'none';
    if (targetTimeout) clearTimeout(targetTimeout);
    createHitEffect(e.clientX, e.clientY);
}

function missTarget() {
    if (!gameActive) return;
    misses++;
    playSound('wrong');
    updateStats();
    target.style.display = 'none';
}

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
    setTimeout(() => effect.remove(), 300);
}

function updateStats() {
    scoreElement.textContent = score;
    hitsElement.textContent = hits;
    missesElement.textContent = misses;
}

function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endGame() {
    gameActive = false;
    if (targetInterval) clearInterval(targetInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (targetTimeout) clearTimeout(targetTimeout);
    target.style.display = 'none';
    if (startBtn) startBtn.textContent = '▶ Начать игру';

    const total = hits + misses;
    const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;

    playSound('win');

    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalHits').textContent = hits;
    document.getElementById('finalMisses').textContent = misses;
    document.getElementById('finalAccuracy').textContent = accuracy;
    document.getElementById('gameOverMessage').style.display = 'flex';

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && typeof updateUserStats === 'function') {
        let bonusPoints = 0;
        if (accuracy >= 90) bonusPoints = 100;
        else if (accuracy >= 70) bonusPoints = 50;
        else if (accuracy >= 50) bonusPoints = 25;
        updateUserStats({ points: score + bonusPoints, gameType: 'attention', difficulty: currentDifficulty, accuracy: accuracy });
    }
}

function restartGame() {
    if (targetInterval) clearInterval(targetInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (targetTimeout) clearTimeout(targetTimeout);
    initGame();
    if (gameMessage) gameMessage.style.display = 'flex';
    if (startBtn) startBtn.textContent = '▶ Начать игру';
    document.getElementById('gameOverMessage').style.display = 'none';
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
    btn.addEventListener('click', () => {
        if (gameActive) {
            if (confirm('Игра идет! Начать заново с новой сложностью?')) changeDifficulty(btn.dataset.difficulty);
        } else {
            changeDifficulty(btn.dataset.difficulty);
        }
    });
});

initGame();