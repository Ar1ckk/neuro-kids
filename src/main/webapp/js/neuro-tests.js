// Состояние тестов
let testResults = {
    schulte: false,
    correction: false,
    stroop: false,
    memory: false
};

// Загрузка сохранённых результатов
function loadTestResults() {
    const saved = localStorage.getItem('neuroTestResults');
    if (saved) {
        testResults = JSON.parse(saved);
        updateTestStatuses();
    }
}

// Сохранение результатов
function saveTestResult(testId, passed) {
    testResults[testId] = passed;
    localStorage.setItem('neuroTestResults', JSON.stringify(testResults));
    updateTestStatuses();

    // Сохраняем в прогресс пользователя
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let user = JSON.parse(currentUser);
        if (!user.testResults) user.testResults = {};
        user.testResults[testId] = passed;
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Обновляем в списке пользователей
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// Обновление статусов на карточках
function updateTestStatuses() {
    for (const [testId, passed] of Object.entries(testResults)) {
        const statusEl = document.getElementById(`${testId}-status`);
        if (statusEl) {
            if (passed) {
                statusEl.textContent = '✅ Пройден';
                statusEl.classList.add('passed');
            } else {
                statusEl.textContent = '📋 Не пройден';
                statusEl.classList.remove('passed');
            }
        }
    }
}

// Открытие теста
function openTest(testType) {
    // Создаём модальное окно для теста
    let modalHtml = '';

    switch(testType) {
        case 'schulte':
            modalHtml = createSchulteModal();
            break;
        case 'correction':
            modalHtml = createCorrectionModal();
            break;
        case 'stroop':
            modalHtml = createStroopModal();
            break;
        case 'memory':
            modalHtml = createMemoryModal();
            break;
    }

    const modalDiv = document.createElement('div');
    modalDiv.className = 'test-modal';
    modalDiv.id = 'testModal';
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv);
    modalDiv.style.display = 'flex';

    // Инициализируем тест
    if (testType === 'schulte') initSchulteTest();
    else if (testType === 'correction') initCorrectionTest();
    else if (testType === 'stroop') initStroopTest();
    else if (testType === 'memory') initMemoryTest();
}

// Закрытие модального окна
function closeTestModal() {
    const modal = document.getElementById('testModal');
    if (modal) modal.remove();
}

// ============ ТЕСТ 1: ТАБЛИЦА ШУЛЬТЕ ============
function createSchulteModal() {
    return `
        <div class="test-modal-content">
            <span class="modal-close" onclick="closeTestModal()">&times;</span>
            <div class="test-modal-body">
                <h3 class="test-title">📊 Таблица Шульте</h3>
                <p style="text-align:center; margin-bottom:20px;">Нажимай на цифры по порядку от 1 до 25!</p>
                <div class="test-stats">
                    <div class="test-stat">
                        <div class="test-stat-value" id="schulte-current">0</div>
                        <div class="test-stat-label">Найдено</div>
                    </div>
                    <div class="test-stat">
                        <div class="test-stat-value" id="schulte-time">0</div>
                        <div class="test-stat-label">Секунд</div>
                    </div>
                </div>
                <div class="schulte-grid" id="schulteGrid"></div>
                <div id="schulteResult" class="test-result" style="display:none;"></div>
            </div>
        </div>
    `;
}

let schulteNumbers = [];
let schulteCurrentNumber = 1;
let schulteStartTime = null;
let schulteTimerInterval = null;

function initSchulteTest() {
    // Генерация случайных чисел от 1 до 25
    schulteNumbers = [];
    for (let i = 1; i <= 25; i++) schulteNumbers.push(i);
    for (let i = schulteNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [schulteNumbers[i], schulteNumbers[j]] = [schulteNumbers[j], schulteNumbers[i]];
    }

    schulteCurrentNumber = 1;
    schulteStartTime = Date.now();

    // Запуск таймера
    if (schulteTimerInterval) clearInterval(schulteTimerInterval);
    schulteTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - schulteStartTime) / 1000);
        document.getElementById('schulte-time').textContent = elapsed;
    }, 100);

    renderSchulteGrid();
}

function renderSchulteGrid() {
    const grid = document.getElementById('schulteGrid');
    grid.innerHTML = '';

    schulteNumbers.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'schulte-cell';
        if (num < schulteCurrentNumber) cell.classList.add('correct');
        cell.textContent = num;
        if (num === schulteCurrentNumber) {
            cell.onclick = () => schulteClick(num);
        }
        grid.appendChild(cell);
    });
}

function schulteClick(num) {
    if (num === schulteCurrentNumber) {
        playSound('correct');
        schulteCurrentNumber++;
        document.getElementById('schulte-current').textContent = schulteCurrentNumber - 1;

        if (schulteCurrentNumber > 25) {
            finishSchulteTest();
        } else {
            renderSchulteGrid();
        }
    } else {
        playSound('wrong');
    }
}

function finishSchulteTest() {
    if (schulteTimerInterval) clearInterval(schulteTimerInterval);
    const finishTime = (Date.now() - schulteStartTime) / 1000;

    let evaluation = '';
    let score = '';

    if (finishTime <= 45) {
        evaluation = 'Отлично! Скорость внимания выше среднего.';
        score = 'excellent';
    } else if (finishTime <= 60) {
        evaluation = 'Хорошо. Нормальный уровень концентрации.';
        score = 'good';
    } else if (finishTime <= 90) {
        evaluation = 'Средний результат. Рекомендуется тренировать внимание.';
        score = 'average';
    } else {
        evaluation = 'Низкий результат. Стоит обратиться к нейропсихологу.';
        score = 'poor';
    }

    const resultDiv = document.getElementById('schulteResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h4>📊 Результат теста</h4>
        <div class="result-score">${finishTime.toFixed(2)} секунд</div>
        <div class="result-evaluation ${score}">${evaluation}</div>
        <button class="test-btn" onclick="saveTestAndClose('schulte', ${finishTime <= 60})">Сохранить результат</button>
    `;
}

// ============ ТЕСТ 2: КОРРЕКТУРНАЯ ПРОБА ============
function createCorrectionModal() {
    return `
        <div class="test-modal-content">
            <span class="modal-close" onclick="closeTestModal()">&times;</span>
            <div class="test-modal-body">
                <h3 class="test-title">✏️ Корректурная проба</h3>
                <p style="text-align:center; margin-bottom:20px;">Зачеркни все буквы <strong>А</strong> и <strong>К</strong> как можно быстрее!</p>
                <div class="test-stats">
                    <div class="test-stat">
                        <div class="test-stat-value" id="correction-progress">0</div>
                        <div class="test-stat-label">Зачёркнуто</div>
                    </div>
                    <div class="test-stat">
                        <div class="test-stat-value" id="correction-time">0</div>
                        <div class="test-stat-label">Секунд</div>
                    </div>
                </div>
                <div class="correction-grid" id="correctionGrid"></div>
                <div id="correctionResult" class="test-result" style="display:none;"></div>
            </div>
        </div>
    `;
}

let correctionSymbols = [];
let correctionCrossed = [];
let correctionStartTime = null;
let correctionTimerInterval = null;

function initCorrectionTest() {
    // Генерация случайных букв
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    correctionSymbols = [];
    correctionCrossed = [];

    for (let i = 0; i < 50; i++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        correctionSymbols.push(randomLetter);
        correctionCrossed.push(false);
    }

    correctionStartTime = Date.now();

    if (correctionTimerInterval) clearInterval(correctionTimerInterval);
    correctionTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - correctionStartTime) / 1000);
        document.getElementById('correction-time').textContent = elapsed;
    }, 100);

    renderCorrectionGrid();
}

function renderCorrectionGrid() {
    const grid = document.getElementById('correctionGrid');
    grid.innerHTML = '';

    let rows = [];
    for (let i = 0; i < correctionSymbols.length; i += 10) {
        rows.push(correctionSymbols.slice(i, i + 10));
    }

    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'correction-row';
        row.forEach((symbol, idx) => {
            const globalIdx = idx + rows.indexOf(row) * 10;
            const span = document.createElement('span');
            span.className = 'correction-symbol';
            if (correctionCrossed[globalIdx]) span.classList.add('crossed');
            span.textContent = symbol;
            span.onclick = () => correctionClick(globalIdx, symbol);
            rowDiv.appendChild(span);
        });
        grid.appendChild(rowDiv);
    });

    const crossedCount = correctionCrossed.filter(c => c === true).length;
    document.getElementById('correction-progress').textContent = crossedCount;
}

function correctionClick(idx, symbol) {
    const targetLetters = ['А', 'К'];
    if (targetLetters.includes(symbol)) {
        if (!correctionCrossed[idx]) {
            correctionCrossed[idx] = true;
            playSound('correct');
            renderCorrectionGrid();

            // Проверка завершения
            const targetIndices = correctionSymbols
                .map((s, i) => targetLetters.includes(s) ? i : -1)
                .filter(i => i !== -1);
            const allCrossed = targetIndices.every(i => correctionCrossed[i]);

            if (allCrossed) {
                finishCorrectionTest();
            }
        }
    } else {
        playSound('wrong');
    }
}

function finishCorrectionTest() {
    if (correctionTimerInterval) clearInterval(correctionTimerInterval);
    const finishTime = (Date.now() - correctionStartTime) / 1000;

    const targetLetters = ['А', 'К'];
    const targetCount = correctionSymbols.filter(s => targetLetters.includes(s)).length;
    const crossedCount = correctionCrossed.filter(c => c === true).length;
    const accuracy = (crossedCount / targetCount) * 100;

    let evaluation = '';
    let score = '';

    if (accuracy === 100 && finishTime <= 30) {
        evaluation = 'Отлично! Высокая концентрация внимания.';
        score = 'excellent';
    } else if (accuracy >= 90 && finishTime <= 45) {
        evaluation = 'Хорошо. Нормальный уровень внимания.';
        score = 'good';
    } else if (accuracy >= 80) {
        evaluation = 'Средний результат. Рекомендуется тренировать внимание.';
        score = 'average';
    } else {
        evaluation = 'Низкий результат. Стоит обратиться к нейропсихологу.';
        score = 'poor';
    }

    const resultDiv = document.getElementById('correctionResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h4>✏️ Результат теста</h4>
        <div class="result-score">Точность: ${accuracy.toFixed(1)}%</div>
        <div class="result-score">Время: ${finishTime.toFixed(1)} сек</div>
        <div class="result-evaluation ${score}">${evaluation}</div>
        <button class="test-btn" onclick="saveTestAndClose('correction', ${accuracy >= 85})">Сохранить результат</button>
    `;
}

// ============ ТЕСТ 3: ТЕСТ СТРУПА ============
function createStroopModal() {
    return `
        <div class="test-modal-content">
            <span class="modal-close" onclick="closeTestModal()">&times;</span>
            <div class="test-modal-body">
                <h3 class="test-title">🎨 Тест Струпа</h3>
                <p style="text-align:center; margin-bottom:20px;">Называй цвет слова, а не то, что написано!</p>
                <div class="test-stats">
                    <div class="test-stat">
                        <div class="test-stat-value" id="stroop-score">0</div>
                        <div class="test-stat-label">Правильно</div>
                    </div>
                    <div class="test-stat">
                        <div class="test-stat-value" id="stroop-total">0</div>
                        <div class="test-stat-label">Всего</div>
                    </div>
                </div>
                <div id="stroopCard" class="stroop-card"></div>
                <div id="stroopResult" class="test-result" style="display:none;"></div>
            </div>
        </div>
    `;
}

let stroopQuestions = [
    { word: 'КРАСНЫЙ', correctColor: 'красный', displayColor: 'red' },
    { word: 'СИНИЙ', correctColor: 'синий', displayColor: 'blue' },
    { word: 'ЗЕЛЁНЫЙ', correctColor: 'зелёный', displayColor: 'green' },
    { word: 'ЖЁЛТЫЙ', correctColor: 'жёлтый', displayColor: 'orange' },
    { word: 'КРАСНЫЙ', correctColor: 'красный', displayColor: 'blue' },
    { word: 'СИНИЙ', correctColor: 'синий', displayColor: 'green' },
    { word: 'ЗЕЛЁНЫЙ', correctColor: 'зелёный', displayColor: 'red' },
    { word: 'ЖЁЛТЫЙ', correctColor: 'жёлтый', displayColor: 'purple' },
    { word: 'КРАСНЫЙ', correctColor: 'красный', displayColor: 'green' },
    { word: 'СИНИЙ', correctColor: 'синий', displayColor: 'red' }
];

let stroopCurrentIndex = 0;
let stroopCorrect = 0;

function initStroopTest() {
    stroopCurrentIndex = 0;
    stroopCorrect = 0;
    updateStroopStats();
    renderStroopQuestion();
}

function updateStroopStats() {
    document.getElementById('stroop-score').textContent = stroopCorrect;
    document.getElementById('stroop-total').textContent = stroopCurrentIndex;
}

function renderStroopQuestion() {
    if (stroopCurrentIndex >= stroopQuestions.length) {
        finishStroopTest();
        return;
    }

    const q = stroopQuestions[stroopCurrentIndex];
    const card = document.getElementById('stroopCard');
    card.innerHTML = `
        <div class="stroop-word" style="color: ${q.displayColor};">${q.word}</div>
        <div class="stroop-options">
            <button class="stroop-option" style="background:#ff6b6b;" onclick="stroopAnswer('красный')">🔴 Красный</button>
            <button class="stroop-option" style="background:#4dabf7;" onclick="stroopAnswer('синий')">🔵 Синий</button>
            <button class="stroop-option" style="background:#51cf66;" onclick="stroopAnswer('зелёный')">🟢 Зелёный</button>
            <button class="stroop-option" style="background:#ffa94d;" onclick="stroopAnswer('жёлтый')">🟡 Жёлтый</button>
        </div>
    `;
}

function stroopAnswer(answer) {
    const q = stroopQuestions[stroopCurrentIndex];
    if (answer === q.correctColor) {
        playSound('correct');
        stroopCorrect++;
    } else {
        playSound('wrong');
    }
    stroopCurrentIndex++;
    updateStroopStats();
    renderStroopQuestion();
}

function finishStroopTest() {
    const accuracy = (stroopCorrect / stroopQuestions.length) * 100;

    let evaluation = '';
    let score = '';

    if (accuracy >= 90) {
        evaluation = 'Отлично! Когнитивная гибкость на высоком уровне.';
        score = 'excellent';
    } else if (accuracy >= 70) {
        evaluation = 'Хорошо. Нормальный уровень.';
        score = 'good';
    } else if (accuracy >= 50) {
        evaluation = 'Средний результат. Рекомендуется тренировать переключаемость внимания.';
        score = 'average';
    } else {
        evaluation = 'Низкий результат. Стоит обратиться к нейропсихологу.';
        score = 'poor';
    }

    const resultDiv = document.getElementById('stroopResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h4>🎨 Результат теста</h4>
        <div class="result-score">Правильно: ${stroopCorrect} из ${stroopQuestions.length}</div>
        <div class="result-score">Точность: ${accuracy.toFixed(1)}%</div>
        <div class="result-evaluation ${score}">${evaluation}</div>
        <button class="test-btn" onclick="saveTestAndClose('stroop', ${accuracy >= 70})">Сохранить результат</button>
    `;
}

// ============ ТЕСТ 4: ЗРИТЕЛЬНАЯ ПАМЯТЬ ============
function createMemoryModal() {
    return `
        <div class="test-modal-content">
            <span class="modal-close" onclick="closeTestModal()">&times;</span>
            <div class="test-modal-body">
                <h3 class="test-title">🖼️ Зрительная память</h3>
                <p style="text-align:center; margin-bottom:20px;">Запомни картинки! Через 5 секунд они исчезнут.</p>
                <div id="memoryPhase" style="text-align:center;">
                    <div class="test-timer" id="memoryTimer">5</div>
                    <div class="memory-grid" id="memoryGrid"></div>
                </div>
                <div id="memoryResult" class="test-result" style="display:none;"></div>
            </div>
        </div>
    `;
}

let memoryImages = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
let memoryUserAnswers = [];
let memoryPhase = 'memorize';
let memoryTimerInterval = null;

function initMemoryTest() {
    memoryPhase = 'memorize';
    memoryUserAnswers = [];
    let timer = 5;

    renderMemoryGrid(true);

    memoryTimerInterval = setInterval(() => {
        timer--;
        const timerEl = document.getElementById('memoryTimer');
        if (timerEl) timerEl.textContent = timer;

        if (timer <= 0) {
            clearInterval(memoryTimerInterval);
            memoryPhase = 'test';
            renderMemoryGrid(false);
        }
    }, 1000);
}

function renderMemoryGrid(showImages) {
    const grid = document.getElementById('memoryGrid');
    if (showImages) {
        grid.innerHTML = memoryImages.map(img => `
            <div class="memory-card">${img}</div>
        `).join('');
    } else {
        grid.innerHTML = memoryImages.map((img, idx) => `
            <div class="memory-card" onclick="memorySelect(${idx})">?</div>
        `).join('');
    }
}

function memorySelect(idx) {
    if (memoryPhase !== 'test') return;

    const selected = document.querySelectorAll('.memory-card')[idx];
    selected.textContent = memoryImages[idx];
    selected.style.background = '#4CAF50';
    memoryUserAnswers.push(memoryImages[idx]);
    selected.onclick = null;

    if (memoryUserAnswers.length === memoryImages.length) {
        finishMemoryTest();
    }
}

function finishMemoryTest() {
    let correct = 0;
    for (let i = 0; i < memoryImages.length; i++) {
        if (memoryUserAnswers[i] === memoryImages[i]) correct++;
    }
    const accuracy = (correct / memoryImages.length) * 100;

    let evaluation = '';
    let score = '';

    if (accuracy === 100) {
        evaluation = 'Отлично! Отличная зрительная память!';
        score = 'excellent';
    } else if (accuracy >= 80) {
        evaluation = 'Хорошо. Память в норме.';
        score = 'good';
    } else if (accuracy >= 60) {
        evaluation = 'Средний результат. Рекомендуется тренировать память.';
        score = 'average';
    } else {
        evaluation = 'Низкий результат. Стоит обратиться к нейропсихологу.';
        score = 'poor';
    }

    const resultDiv = document.getElementById('memoryResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h4>🖼️ Результат теста</h4>
        <div class="result-score">Правильно: ${correct} из ${memoryImages.length}</div>
        <div class="result-score">Точность: ${accuracy.toFixed(1)}%</div>
        <div class="result-evaluation ${score}">${evaluation}</div>
        <button class="test-btn" onclick="saveTestAndClose('memory', ${accuracy >= 80})">Сохранить результат</button>
    `;
}

// Сохранение результата и закрытие
function saveTestAndClose(testId, passed) {
    saveTestResult(testId, passed);
    playSound('win');
    closeTestModal();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadTestResults();
});