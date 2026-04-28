document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

function playGame(gameType) {
    const currentUser = localStorage.getItem('currentUser');

    switch(gameType) {
        case 'memory':
            // Запускаем игру "Найди пару"
            window.location.href = 'memory-game.html';
            break;
        case 'attention':
            alert("🎯 Игра 'Быстрая реакция' в разработке!");
            break;
        case 'logic':
            alert("🧩 Игра 'Логические задачи' будет готова скоро!");
            break;
        case 'math':
            alert("🔢 Игра 'Веселая математика' уже в пути!");
            break;
        default:
            alert("Игра скоро появится!");
    }
}

// Функция для проверки авторизации (из main.js)
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

// Функция выхода (из main.js)
function logout() {
    localStorage.removeItem('currentUser');
    checkAuth();
    location.reload();
}

// Функция открытия модального окна (из main.js)
function openModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'block';
        if (typeof showModalTab === 'function') {
            showModalTab(tab);
        }
    }
}

// Функция закрытия модального окна (из main.js)
function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}