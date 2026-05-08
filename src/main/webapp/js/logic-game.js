// База данных вопросов "Найди лишнее" с картинками (эмодзи)
const questionsDB = {
    easy: [
        {
            items: ["🐶", "🐱", "🐭", "✏️"],
            correctIndex: 3,
            explanation: "✏️ - это предмет, а остальные - животные"
        },
        {
            items: ["🍎", "🍌", "🍊", "🚗"],
            correctIndex: 3,
            explanation: "🚗 - это транспорт, а остальное - фрукты"
        },
        {
            items: ["🔴", "🔵", "🟢", "⭕"],
            correctIndex: 3,
            explanation: "⭕ - это пустой круг, а остальные - цветные круги"
        },
        {
            items: ["🐟", "🐠", "🐡", "🐦"],
            correctIndex: 3,
            explanation: "🐦 - это птица, а остальные - рыбы"
        },
        {
            items: ["📘", "📙", "📕", "🍕"],
            correctIndex: 3,
            explanation: "🍕 - это еда, а остальные - книги"
        },
        {
            items: ["⚽", "🏀", "🎾", "📺"],
            correctIndex: 3,
            explanation: "📺 - это телевизор, а остальные - мячи"
        },
        {
            items: ["🌞", "🌙", "⭐", "🐸"],
            correctIndex: 3,
            explanation: "🐸 - это животное, а остальные - небесные тела"
        },
        {
            items: ["🎵", "🎶", "🎹", "🚲"],
            correctIndex: 3,
            explanation: "🚲 - это транспорт, а остальные - музыка"
        },
        {
            items: ["👨", "👩", "👧", "🐘"],
            correctIndex: 3,
            explanation: "🐘 - это животное, а остальные - люди"
        },
        {
            items: ["☕", "🥛", "🧃", "🔑"],
            correctIndex: 3,
            explanation: "🔑 - это ключ, а остальные - напитки"
        }
    ],
    medium: [
        {
            items: ["🐶", "🐱", "🐭", "🐮", "✈️"],
            correctIndex: 4,
            explanation: "✈️ - это транспорт, а остальные - животные"
        },
        {
            items: ["🍎", "🍌", "🍒", "🍉", "📚"],
            correctIndex: 4,
            explanation: "📚 - это книги, а остальное - фрукты"
        },
        {
            items: ["🔴", "🔵", "🟢", "🟡", "⬛"],
            correctIndex: 4,
            explanation: "⬛ - это черный квадрат, а остальные - цветные круги"
        },
        {
            items: ["🐟", "🐠", "🐡", "🐙", "🐦"],
            correctIndex: 4,
            explanation: "🐦 - это птица, а остальные - морские обитатели"
        },
        {
            items: ["⚽", "🏀", "🎾", "🏈", "🍰"],
            correctIndex: 4,
            explanation: "🍰 - это еда, а остальные - спортивные мячи"
        },
        {
            items: ["🌞", "🌙", "⭐", "🌍", "🐸"],
            correctIndex: 4,
            explanation: "🐸 - это животное, а остальные - космические объекты"
        },
        {
            items: ["🎸", "🥁", "🎹", "🎺", "🚗"],
            correctIndex: 4,
            explanation: "🚗 - это машина, а остальные - музыкальные инструменты"
        },
        {
            items: ["👨‍⚕️", "👩‍🍳", "👨‍🏫", "👩‍🎨", "🐱"],
            correctIndex: 4,
            explanation: "🐱 - это животное, а остальные - профессии"
        },
        {
            items: ["✏️", "📏", "✂️", "📎", "🍎"],
            correctIndex: 4,
            explanation: "🍎 - это фрукт, а остальные - школьные принадлежности"
        },
        {
            items: ["🚗", "🚕", "🚙", "🚌", "🐴"],
            correctIndex: 4,
            explanation: "🐴 - это животное, а остальные - машины"
        }
    ],
    hard: [
        {
            items: ["🐶", "🐱", "🐭", "🐹", "🐰", "✈️", "🚗"],
            correctIndex: 5,
            explanation: "✈️ и 🚗 - это транспорт, но лишний первый транспорт ✈️, так как он летает, а остальные животные"
        },
        {
            items: ["🍎", "🍌", "🍊", "🍇", "🍉", "📖", "✏️"],
            correctIndex: 5,
            explanation: "📖 и ✏️ - школьные принадлежности, лишний первый - 📖"
        },
        {
            items: ["🔴", "🔵", "🟢", "🟡", "🟣", "⬛", "⬜"],
            correctIndex: 5,
            explanation: "⬛ и ⬜ - черный и белый, лишний ⬛"
        },
        {
            items: ["🐟", "🐠", "🐡", "🐙", "🦑", "🐬", "🐦"],
            correctIndex: 6,
            explanation: "🐦 - это птица, а остальные - морские обитатели"
        },
        {
            items: ["⚽", "🏀", "🎾", "🏈", "⚾", "🥎", "🍕"],
            correctIndex: 6,
            explanation: "🍕 - это еда, а остальные - спортивные мячи"
        },
        {
            items: ["🌞", "🌙", "⭐", "🌍", "🪐", "☄️", "🐸"],
            correctIndex: 6,
            explanation: "🐸 - это животное, а остальные - космические объекты"
        },
        {
            items: ["🎸", "🥁", "🎹", "🎺", "🎻", "🪕", "🚗"],
            correctIndex: 6,
            explanation: "🚗 - это машина, а остальные - музыкальные инструменты"
        },
        {
            items: ["👨‍⚕️", "👩‍🍳", "👨‍🏫", "👩‍🎨", "👨‍💻", "👩‍🔬", "🐱"],
            correctIndex: 6,
            explanation: "🐱 - это животное, а остальные - профессии"
        },
        {
            items: ["✏️", "📏", "✂️", "📎", "📒", "📚", "🍎"],
            correctIndex: 6,
            explanation: "🍎 - это фрукт, а остальные - школьные принадлежности"
        },
        {
            items: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🐴"],
            correctIndex: 6,
            explanation: "🐴 - это животное, а остальные - машины"
        }
    ]
};

let currentDifficulty = 'easy';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correct = 0;
let wrong = 0;
let answered = false;
let totalQuestions = 10;

// DOM элементы
const questionNumElement = document.getElementById('questionNum');
const totalQuestionsElement = document.getElementById('totalQuestions');
const scoreElement = document.getElementById('score');
const correctElement = document.getElementById('correct');
const wrongElement = document.getElementById('wrong');
const itemsGrid = document.getElementById('itemsGrid');
const nextBtn = document.getElementById('nextBtn');
const gameCompleteDiv = document.getElementById('gameComplete');

// Инициализация игры
function initGame() {
    currentQuestions = [...questionsDB[currentDifficulty]];
    currentQuestions = shuffleArray(currentQuestions);
    currentQuestions = currentQuestions.slice(0, 10);

    currentQuestionIndex = 0;
    score = 0;
    correct = 0;
    wrong = 0;
    answered = false;

    updateStats();
    loadQuestion();

    nextBtn.style.display = 'none';
    gameCompleteDiv.style.display = 'none';
}

// Перемешивание массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Обновление статистики
function updateStats() {
    questionNumElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = currentQuestions.length;
    scoreElement.textContent = score;
    correctElement.textContent = correct;
    wrongElement.textContent = wrong;
}

// Загрузка вопроса
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    answered = false;
    const question = currentQuestions[currentQuestionIndex];

    // Создаем сетку с картинками
    itemsGrid.innerHTML = '';
    question.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <span class="item-emoji">${item}</span>
            <span class="item-label">${getItemLabel(item)}</span>
        `;
        card.onclick = () => checkAnswer(index);
        itemsGrid.appendChild(card);
    });

    nextBtn.style.display = 'none';
}

// Получить название для эмодзи
function getItemLabel(emoji) {
    const labels = {
        '🐶': 'собака', '🐱': 'кошка', '🐭': 'мышь', '🐹': 'хомяк', '🐰': 'кролик',
        '🐮': 'корова', '🐷': 'свинья', '🐸': 'лягушка', '🐙': 'осьминог', '🐬': 'дельфин',
        '🍎': 'яблоко', '🍌': 'банан', '🍊': 'апельсин', '🍇': 'виноград', '🍉': 'арбуз',
        '🍒': 'вишня', '🚗': 'машина', '🚕': 'такси', '🚙': 'внедорожник', '✈️': 'самолет',
        '📚': 'книги', '✏️': 'карандаш', '📖': 'книга', '🔴': 'красный', '🔵': 'синий',
        '🟢': 'зеленый', '🟡': 'желтый', '⚽': 'футбол', '🏀': 'баскетбол', '🎾': 'теннис',
        '🌞': 'солнце', '🌙': 'луна', '⭐': 'звезда', '🎵': 'нота', '🎶': 'ноты', '🎹': 'пианино'
    };
    return labels[emoji] || 'предмет';
}

// Проверка ответа
function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = (selectedIndex === question.correctIndex);

    const cards = document.querySelectorAll('.item-card');
    cards.forEach((card, idx) => {
        card.classList.add('disabled');
        if (idx === question.correctIndex) {
            card.classList.add('correct');
        }
        if (idx === selectedIndex && !isCorrect) {
            card.classList.add('wrong');
        }
    });

    if (isCorrect) {
        correct++;
        let points = 0;
        if (currentDifficulty === 'easy') points = 10;
        else if (currentDifficulty === 'medium') points = 20;
        else points = 30;
        score += points;
        showExplanation(true, question.explanation);
    } else {
        wrong++;
        showExplanation(false, question.explanation);
    }

    updateStats();
    nextBtn.style.display = 'block';
}

// Показать объяснение
function showExplanation(isCorrect, explanation) {
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation-message';
    explanationDiv.style.cssText = `
        background: ${isCorrect ? '#d4edda' : '#f8d7da'};
        color: ${isCorrect ? '#155724' : '#721c24'};
    `;
    explanationDiv.innerHTML = `
        <strong>${isCorrect ? '✅ Правильно!' : '❌ Неправильно'}</strong><br>
        ${explanation}
    `;

    itemsGrid.parentNode.appendChild(explanationDiv);

    setTimeout(() => {
        explanationDiv.remove();
    }, 3000);
}

// Следующий вопрос
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Завершение игры
function endGame() {
    const total = correct + wrong;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    let points = score;
    if (percent === 100) points += 100;
    else if (percent >= 80) points += 50;
    else if (percent >= 60) points += 25;

    document.getElementById('finalCorrect').textContent = correct;
    document.getElementById('finalTotal').textContent = total;
    document.getElementById('finalPercent').textContent = percent;
    document.getElementById('finalPoints').textContent = points;

    const ratingDiv = document.getElementById('rating');
    if (percent === 100) ratingDiv.innerHTML = '🌟🌟🌟🌟🌟 Отлично! Ты гений!';
    else if (percent >= 80) ratingDiv.innerHTML = '🌟🌟🌟🌟 Очень хорошо!';
    else if (percent >= 60) ratingDiv.innerHTML = '🌟🌟🌟 Хорошо!';
    else if (percent >= 40) ratingDiv.innerHTML = '🌟🌟 Неплохо, но нужно повторить!';
    else ratingDiv.innerHTML = '🌟 Попробуй ещё раз! У тебя получится!';

    gameCompleteDiv.style.display = 'flex';

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && typeof updateUserStats === 'function') {
        updateUserStats({
            points: points,
            gameType: 'logic',
            difficulty: currentDifficulty,
            correct: correct,
            total: total,
            percent: percent
        });
    }
}

// Перезапуск
function restartGame() {
    gameCompleteDiv.style.display = 'none';
    initGame();
}

// Смена сложности
function changeDifficulty(difficulty) {
    currentDifficulty = difficulty;

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

// Обработчики сложности
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        changeDifficulty(btn.dataset.difficulty);
    });
});

initGame();