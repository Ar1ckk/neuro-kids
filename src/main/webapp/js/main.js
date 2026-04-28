// Проверяем авторизацию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    // Показываем модальное окно ТОЛЬКО на главной странице (index.html)
    // и только если пользователь не авторизован
    const currentUser = localStorage.getItem('currentUser');
    const isHomePage = window.location.pathname.includes('index.html') ||
                       window.location.pathname === '/' ||
                       window.location.pathname.endsWith('/neuro-kids/');

    if (!currentUser && isHomePage) {
        // Показываем окно через 1 секунду только на главной
        setTimeout(() => {
            openModal('login');
        }, 1000);
    }
});

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const userInfo = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    const userName = document.getElementById('userName');

    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (userName) {
            userName.textContent = `👋 ${user.name}`;
        }
        if (userInfo) {
            userInfo.style.display = 'flex';
        }
        if (authButtons) {
            authButtons.style.display = 'none';
        }
    } else {
        if (userInfo) {
            userInfo.style.display = 'none';
        }
        if (authButtons) {
            authButtons.style.display = 'flex';
        }
    }
}

// Открыть модальное окно с нужной вкладкой
function openModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'block';
        // Показываем нужную вкладку
        showModalTab(tab);
        // Сбрасываем формы
        resetModalForms();
    }
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        resetModalForms();
    }
}

// Сброс форм
function resetModalForms() {
    // Очищаем поля
    const inputs = document.querySelectorAll('.modal-content input');
    inputs.forEach(input => input.value = '');

    const messageDiv = document.getElementById('modalMessage');
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }
}

// Переключение вкладок в модальном окне
function showModalTab(tab) {
    const loginForm = document.getElementById('modalLoginForm');
    const registerForm = document.getElementById('modalRegisterForm');
    const tabs = document.querySelectorAll('.modal-content .tab-btn');

    tabs.forEach(btn => btn.classList.remove('active'));

    if (tab === 'login') {
        if (loginForm) loginForm.classList.add('active');
        if (registerForm) registerForm.classList.remove('active');
        if (tabs[0]) tabs[0].classList.add('active');
    } else {
        if (loginForm) loginForm.classList.remove('active');
        if (registerForm) registerForm.classList.add('active');
        if (tabs[1]) tabs[1].classList.add('active');
    }

    // Очищаем сообщение
    const messageDiv = document.getElementById('modalMessage');
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }
}

// Регистрация в модальном окне
function modalRegisterUser(event) {
    event.preventDefault();

    const name = document.getElementById('modalRegName').value;
    const age = document.getElementById('modalRegAge').value;
    const username = document.getElementById('modalRegUsername').value;
    const password = document.getElementById('modalRegPassword').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        showModalMessage('Пользователь с таким логином уже существует!', 'error');
        return;
    }

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
    modalLoginUserDirect(username, password);
}

// Вход в модальном окне
function modalLoginUser(event) {
    event.preventDefault();

    const username = document.getElementById('modalLoginUsername').value;
    const password = document.getElementById('modalLoginPassword').value;

    modalLoginUserDirect(username, password);
}

function modalLoginUserDirect(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showModalMessage('Успешный вход!', 'success');

        setTimeout(() => {
            closeModal();
            checkAuth();
            location.reload(); // Обновляем страницу для отображения данных пользователя
        }, 1000);
    } else {
        showModalMessage('Неверный логин или пароль!', 'error');
    }
}

function showModalMessage(text, type) {
    const messageDiv = document.getElementById('modalMessage');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
    }

    setTimeout(() => {
        if (messageDiv) {
            messageDiv.style.display = 'none';
            messageDiv.className = 'message';
        }
    }, 3000);
}

function startGame() {
    window.location.href = 'games.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    checkAuth();
    location.reload();
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target == modal) {
        closeModal();
    }
}