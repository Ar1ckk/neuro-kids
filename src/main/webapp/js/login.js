// Переключение между вкладками
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');

    // Убираем активный класс у всех вкладок
    tabs.forEach(btn => btn.classList.remove('active'));

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabs[1].classList.add('active');
    }
}

// Функция регистрации
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('regName').value;
    const age = document.getElementById('regAge').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    // Проверяем, существует ли уже пользователь
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        showMessage('Пользователь с таким логином уже существует!', 'error');
        return;
    }

    // Создаем нового пользователя
    const newUser = {
        id: Date.now(),
        name: name,
        age: age,
        username: username,
        password: password,
        gamesPlayed: 0,
        totalScore: 0,
        achievements: 0,
        registerDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Автоматически входим
    login(username, password);
}

// Функция входа
function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    login(username, password);
}

function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Сохраняем текущего пользователя
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('Успешный вход! Перенаправление...', 'success');

        // Переходим на главную страницу
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showMessage('Неверный логин или пароль!', 'error');
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;

    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }, 3000);
}

// Проверяем, если пользователь уже вошел, перенаправляем на главную
if (window.location.pathname.includes('login.html')) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
    }
}