document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

function playGame(gameType) {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Для гостей показываем сообщение
        if (confirm('👋 Чтобы сохранять прогресс и получать достижения, войдите в аккаунт!\n\nХотите войти или зарегистрироваться?')) {
            openModal();
        } else {
            alert('Игра запускается в гостевом режиме. Прогресс не сохранится!');
            startGameDemo(gameType);
        }
    } else {
        startGameDemo(gameType);
    }
}

function startGameDemo(gameType) {
    switch(gameType) {
        case 'memory':
            alert("🎴 Игра 'Найди пару' скоро появится!");
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