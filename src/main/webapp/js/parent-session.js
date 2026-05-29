// Базовые упражнения (те же, что в твоём файле)
const exercises = [
    {
        id: "warmup",
        title: "Весёлое пробуждение",
        type: "Разминка",
        duration: "3 минуты",
        category: "selfControl",
        goal: "Мягко включить ребёнка в занятие, проверить готовность следовать простой инструкции.",
        story: "Представь, что мы просыпаемся в волшебном лесу и помогаем солнышку подняться.",
        instruction: "Попросите ребёнка потянуться вверх, присесть, хлопнуть в ладоши и улыбнуться. Повторите 5 раз.",
        questions: [
            "Что мы делаем сначала: тянемся, приседаем или хлопаем?",
            "Можешь повторить движение в таком же порядке?",
            "Что изменится, если я скажу выполнять движения медленнее?"
        ]
    },
    {
        id: "crossSteps",
        title: "Перекрёстные шаги",
        type: "Моторика",
        duration: "5 минут",
        category: "motor",
        goal: "Развивать координацию, чувство ритма и согласованность движений.",
        story: "Мы идём по мостику через речку. Чтобы мостик не исчез, нужно касаться колена противоположной рукой.",
        instruction: "Ребёнок касается правой рукой левого колена, затем левой рукой правого колена. Выполните 10–12 повторений.",
        questions: [
            "Какой рукой ты сейчас коснулся колена?",
            "Можешь сделать это медленно и без спешки?",
            "Получится ли выполнить упражнение под счёт?"
        ]
    },
    {
        id: "animalClap",
        title: "Хлопни только на зверя",
        type: "Внимание",
        duration: "5–6 минут",
        category: "attention",
        goal: "Тренировать слуховое внимание, удержание правила и торможение лишних реакций.",
        story: "Мы охраняем зоопарк. Хлопать можно только тогда, когда слышишь название животного.",
        instruction: "Называйте слова: кошка, стол, собака, мяч, лиса, книга, слон, окно. Ребёнок хлопает только на животных.",
        questions: [
            "На какие слова нужно хлопать?",
            "Почему на слово «стол» хлопать не нужно?",
            "Сможешь не хлопнуть, если очень хочется, но слово не подходит?"
        ]
    },
    {
        id: "memoryChain",
        title: "Запомни цепочку",
        type: "Память",
        duration: "5 минут",
        category: "memory",
        goal: "Развивать слухоречевую память и способность удерживать последовательность действий.",
        story: "Мы собираем рюкзак для маленького путешественника. Нужно запомнить, что он берёт с собой.",
        instruction: "Назовите 3 слова: дом, кот, сок. Попросите повторить. Затем добавьте 4-е слово.",
        questions: [
            "Какие слова ты запомнил?",
            "Какое слово было первым?",
            "Какое слово мы добавили последним?"
        ]
    },
    {
        id: "rightLeft",
        title: "Право и лево",
        type: "Пространственная ориентация",
        duration: "4 минуты",
        category: "spatial",
        goal: "Развивать ориентацию в схеме тела и понимание пространственных инструкций.",
        story: "Мы помогаем роботу найти дорогу. Робот слушает команды.",
        instruction: "Попросите ребёнка поднять правую руку, дотронуться до левого уха, сделать шаг вправо, затем шаг влево.",
        questions: [
            "Где у тебя правая рука?",
            "Что находится слева от тебя?",
            "Можешь показать направление?"
        ]
    },
    {
        id: "storyRetell",
        title: "Расскажи историю",
        type: "Речь",
        duration: "5 минут",
        category: "speech",
        goal: "Развивать связную речь, понимание причинно-следственных связей и последовательность рассказа.",
        story: "Котёнок потерял клубок, нашёл его под стулом и принёс бабушке.",
        instruction: "Прочитайте ребёнку короткую историю. Попросите ответить на вопросы и пересказать её.",
        questions: [
            "Кто был главным героем истории?",
            "Что он потерял?",
            "Где он нашёл клубок?",
            "Кому он его принёс?",
            "Что было сначала, а что потом?"
        ]
    }
];

// Категории и их названия
const categoryNames = {
    attention: "Внимание",
    memory: "Память",
    motor: "Моторика",
    speech: "Речь",
    spatial: "Пространство",
    selfControl: "Самоконтроль"
};

// Рекомендации для каждой категории
const categoryTips = {
    attention: {
        low: "Есть трудности с удержанием правила и переключением внимания. В следующих занятиях используйте короткие игры на реакцию.",
        middle: "Внимание удерживается частично. Продолжайте упражнения на слуховое внимание, постепенно усложняйте правило.",
        high: "Задания на внимание выполняются уверенно. Можно добавлять более сложные правила."
    },
    memory: {
        low: "Слухоречевая память требует поддержки. Начинайте с 2–3 слов, используйте картинки.",
        middle: "Память справляется с короткими цепочками, но при усложнении могут появляться ошибки.",
        high: "Память показала хороший уровень. Можно добавлять задания на пересказ."
    },
    motor: {
        low: "Координационные упражнения вызвали трудности. Делайте движения медленнее, перед зеркалом.",
        middle: "Моторный блок выполнен частично. Сохраняйте перекрёстные движения.",
        high: "Координационные задания выполняются хорошо. Можно добавить ритм, счёт или музыку."
    },
    speech: {
        low: "Речевые задания требуют дополнительной поддержки. Используйте наводящие вопросы.",
        middle: "Речь и пересказ развиваются, но ребёнку может требоваться помощь в последовательности.",
        high: "Речевой блок выполнен уверенно. Можно предлагать ребёнку самому придумывать концовку."
    },
    spatial: {
        low: "Есть трудности с право-лево и пространственными инструкциями. Закрепляйте схему тела через игру.",
        middle: "Пространственные инструкции выполняются частично. Продолжайте задания с телом и предметами.",
        high: "Пространственная ориентация хорошая. Можно переходить к схемам и маршрутам."
    },
    selfControl: {
        low: "Самоконтроль пока даётся сложно. Уменьшите количество инструкций, используйте визуальные подсказки.",
        middle: "Самоконтроль проявляется, но зависит от усталости. Чередуйте активные и спокойные задания.",
        high: "Ребёнок хорошо включился в занятие и удерживал инструкцию."
    }
};

// Рендеринг упражнений
function renderExercises() {
    const container = document.getElementById('exerciseList');
    if (!container) return;

    container.innerHTML = exercises.map((ex, idx) => `
        <div class="exercise-card">
            <div class="exercise-header">
                <div class="exercise-title-row">
                    <span class="step-number">${idx + 1}</span>
                    <h4 style="margin:0">${ex.title}</h4>
                </div>
                <div style="display:flex; gap:8px;">
                    <span class="tag">${ex.type}</span>
                    <span class="tag">${ex.duration}</span>
                    <span class="tag">${categoryNames[ex.category]}</span>
                </div>
            </div>
            <div class="exercise-body">
                <div class="info-box">
                    <strong>🎯 Цель</strong>
                    ${ex.goal}
                </div>
                <div class="info-box">
                    <strong>📖 Игровой сюжет</strong>
                    ${ex.story}
                </div>
                <div class="info-box">
                    <strong>📝 Инструкция родителю</strong>
                    ${ex.instruction}
                </div>
                <div class="questions-block">
                    <div class="question-item">
                        <div class="question-title">❓ Вопросы ребёнку</div>
                        <ul style="margin:0; padding-left:20px;">
                            ${ex.questions.map(q => `<li style="margin:5px 0">${q}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="question-item">
                        <div class="question-title">⭐ Как ребёнок справился?</div>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="result_${ex.id}" value="2" required> ✅ Выполнил самостоятельно
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="result_${ex.id}" value="1"> 🤝 Выполнил с подсказкой
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="result_${ex.id}" value="0"> 😟 Было сложно
                            </label>
                        </div>
                    </div>
                    <div class="question-item">
                        <div class="question-title">👀 Уровень внимания во время задания (1-5)</div>
                        <div class="scale-group">
                            ${[1,2,3,4,5].map(v => `
                                <label class="scale-option">
                                    <input type="radio" name="attention_${ex.id}" value="${v}" required> ${v}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Получение значений радио-кнопок
function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? Number(checked.value) : null;
}

// Расчёт результатов
function calculateResults() {
    const categoryData = {};
    let totalResult = 0;
    let maxResult = 0;
    let attentionSum = 0;
    let attentionCount = 0;

    Object.keys(categoryNames).forEach(cat => {
        categoryData[cat] = { score: 0, max: 0 };
    });

    exercises.forEach(ex => {
        const result = getRadioValue(`result_${ex.id}`);
        const attention = getRadioValue(`attention_${ex.id}`);

        if (result !== null) {
            totalResult += result;
            maxResult += 2;
            categoryData[ex.category].score += result;
            categoryData[ex.category].max += 2;
        }

        if (attention !== null) {
            attentionSum += attention;
            attentionCount++;
        }
    });

    const totalPercent = maxResult > 0 ? Math.round((totalResult / maxResult) * 100) : 0;
    const attentionAverage = attentionCount > 0 ? Number((attentionSum / attentionCount).toFixed(1)) : 0;

    const categoryPercent = {};
    Object.entries(categoryData).forEach(([cat, data]) => {
        categoryPercent[cat] = data.max > 0 ? Math.round((data.score / data.max) * 100) : null;
    });

    return { totalPercent, attentionAverage, categoryPercent };
}

// Определение уровня
function levelByScore(percent) {
    if (percent < 45) return "low";
    if (percent < 75) return "middle";
    return "high";
}

function levelText(percent) {
    if (percent < 45) return "зона поддержки";
    if (percent < 75) return "средний уровень";
    return "уверенное выполнение";
}

function recClass(percent) {
    if (percent < 45) return "danger";
    if (percent < 75) return "warn";
    return "good";
}

// Построение рекомендаций
function buildRecommendations(data) {
    const selectedGoal = document.getElementById("mainGoal")?.value || "attention";
    const mood = document.getElementById("mood")?.value || "normal";
    const recommendations = [];

    if (mood === "tired") {
        recommendations.push({
            type: "warn",
            text: "Так как до занятия отмечалась усталость или раздражение, следующие занятия лучше делать короче: 10–15 минут, с большим количеством пауз."
        });
    }

    if (data.attentionAverage < 3) {
        recommendations.push({
            type: "danger",
            text: "Во время занятия внимание было снижено. Рекомендуется уменьшить длительность отдельных заданий, давать одну инструкцию за раз."
        });
    } else if (data.attentionAverage < 4) {
        recommendations.push({
            type: "warn",
            text: "Внимание удерживалось не всегда стабильно. Следующее занятие лучше строить по принципу чередования: активное задание — спокойное."
        });
    } else {
        recommendations.push({
            type: "good",
            text: "Ребёнок достаточно хорошо удерживал внимание. Можно постепенно добавлять более сложные правила."
        });
    }

    Object.entries(data.categoryPercent).forEach(([category, percent]) => {
        if (percent === null) return;
        const level = levelByScore(percent);
        const tip = categoryTips[category]?.[level] || "";
        if (tip) recommendations.push({ type: recClass(percent), text: tip });
    });

    return recommendations;
}

// Построение плана следующего занятия
function buildNextPlan(data) {
    const weakCategories = Object.entries(data.categoryPercent)
        .filter(([cat, percent]) => percent !== null && percent < 75)
        .map(([cat]) => cat);

    const plan = [];
    plan.push("1. Разминка: 2–3 минуты простых движений по образцу родителя.");

    if (weakCategories.includes("attention")) {
        plan.push("2. Внимание: игра «хлопни только на нужное слово» с меньшим количеством слов.");
    }
    if (weakCategories.includes("motor")) {
        plan.push("3. Моторика: перекрёстные движения перед зеркалом, 6–8 повторений.");
    }
    if (weakCategories.includes("memory")) {
        plan.push("4. Память: цепочка из 2–3 слов с опорой на картинки.");
    }
    if (weakCategories.includes("spatial")) {
        plan.push("5. Пространство: команды с телом и предметами: справа, слева, над, под.");
    }
    if (weakCategories.includes("speech")) {
        plan.push("6. Речь: короткая история из 2–3 событий с вопросами.");
    }

    if (weakCategories.length === 0) {
        plan.push("2. Основной блок: повторить текущие упражнения, но добавить одно новое правило.");
        plan.push("3. Закрепление: попросить ребёнка самому объяснить правило игры родителю.");
    }

    plan.push("Завершение: спокойное дыхание и похвала за старание.");
    return plan;
}

// Отображение результатов
function renderResults(data) {
    const childName = document.getElementById("childName")?.value.trim() || "ребёнка";
    const recommendations = buildRecommendations(data);
    const plan = buildNextPlan(data);

    const summaryGrid = document.getElementById("summaryGrid");
    if (summaryGrid) {
        summaryGrid.innerHTML = `
            <div class="summary-item"><span>Ребёнок</span><strong>${childName}</strong></div>
            <div class="summary-item"><span>Общий результат</span><strong>${data.totalPercent}%</strong></div>
            <div class="summary-item"><span>Среднее внимание</span><strong>${data.attentionAverage}/5</strong></div>
            <div class="summary-item"><span>Интерпретация</span><strong>${levelText(data.totalPercent)}</strong></div>
        `;
    }

    const categoryBars = document.getElementById("categoryBars");
    if (categoryBars) {
        categoryBars.innerHTML = Object.entries(data.categoryPercent)
            .filter(([cat, p]) => p !== null)
            .map(([cat, p]) => `
                <div class="category-line">
                    <strong>${categoryNames[cat]}</strong>
                    <div class="bar"><div class="bar-fill" style="width: ${p}%;"></div></div>
                    <span>${p}%</span>
                </div>
            `).join("");
    }

    const recommendationsEl = document.getElementById("recommendations");
    if (recommendationsEl) {
        recommendationsEl.innerHTML = recommendations.map(r => `<div class="rec ${r.type}">${r.text}</div>`).join("");
    }

    const nextPlanEl = document.getElementById("nextPlan");
    if (nextPlanEl) {
        nextPlanEl.innerHTML = plan.map(p => `<div class="rec">${p}</div>`).join("");
    }

    const resultsCard = document.getElementById("results");
    if (resultsCard) resultsCard.style.display = "block";

    resultsCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Обработчики событий
document.addEventListener("DOMContentLoaded", function() {
    renderExercises();

    const form = document.getElementById("sessionForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            // Проверяем заполнение всех обязательных полей
            let allFilled = true;
            exercises.forEach(ex => {
                if (!getRadioValue(`result_${ex.id}`)) allFilled = false;
                if (!getRadioValue(`attention_${ex.id}`)) allFilled = false;
            });

            if (!allFilled) {
                alert("Пожалуйста, оцените выполнение всех заданий (результат и внимание).");
                return;
            }

            const data = calculateResults();
            renderResults(data);

            // Звук завершения
            if (typeof playSound === 'function') playSound('win');
        });
    }

    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function() {
            if (form) form.reset();
            const resultsCard = document.getElementById("results");
            if (resultsCard) resultsCard.style.display = "none";
            if (typeof playSound === 'function') playSound('click');
        });
    }

    const printBtn = document.getElementById("printBtn");
    if (printBtn) {
        printBtn.addEventListener("click", function() {
            window.print();
        });
    }
});