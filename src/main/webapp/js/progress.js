document.addEventListener('DOMContentLoaded', function() {
    loadUserProgress();
});

function loadUserProgress() {
    const currentUser = localStorage.getItem('currentUser');
    const progressContent = document.getElementById('progressContent');

    if (!currentUser) {
        // Показываем сообщение для гостей с кнопками
        progressContent.innerHTML = `
            <div class="guest-warning">
                <div class="guest-icon">👋</div>
                <h3>Привет, гость!</h3>
                <p>Войдите или зарегистрируйтесь, чтобы сохранять свой прогресс и получать достижения!</p>
                <div class="guest-buttons">
                    <button class="guest-login-btn" onclick="openModal('login')">Вход</button>
                    <button class="guest-register-btn" onclick="openModal('register')">Регистрация</button>
                </div>
            </div>
            <div class="stats">
                <h3>Статистика в гостевом режиме</h3>
                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Сыграно игр</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Всего очков</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Достижений</div>
                    </div>
                </div>
            </div>
            <div class="achievements">
                <h3>Достижения</h3>
                <div class="achievements-list">
                    <p>🔓 Войдите в аккаунт, чтобы открывать достижения!</p>
                </div>
            </div>
        `;
        return;
    }

    const user = JSON.parse(currentUser);

    // Показываем профиль пользователя
    let level = 1;
    if (user.totalScore >= 1000) level = 5;
    else if (user.totalScore >= 500) level = 4;
    else if (user.totalScore >= 200) level = 3;
    else if (user.totalScore >= 50) level = 2;

    // Достижения
    const achievements = [];
    if ((user.gamesPlayed || 0) >= 1) achievements.push('🎮 Первая игра');
    if ((user.totalScore || 0) >= 50) achievements.push('🌟 50 очков');
    if ((user.totalScore || 0) >= 200) achievements.push('🏆 200 очков');
    if ((user.gamesPlayed || 0) >= 5) achievements.push('🎯 5 игр пройдено');
    if ((user.gamesPlayed || 0) >= 10) achievements.push('🔥 Новичок-рекордсмен');

    const achievementsHtml = achievements.length > 0
        ? achievements.map(a => `<div class="achievement-badge">${a}</div>`).join('')
        : '<p>🎯 Пройди свою первую игру, чтобы получить достижения!</p>';

    progressContent.innerHTML = `
        <div class="profile-card">
            <div class="avatar">🧒</div>
            <h3>${user.name}</h3>
            <div class="level-info">
                <div class="level">Уровень ${level}</div>
                <div class="points">⭐ ${user.totalScore || 0} очков</div>
            </div>
        </div>

        <div class="stats">
            <h3>Статистика</h3>
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-value">${user.gamesPlayed || 0}</div>
                    <div class="stat-label">Сыграно игр</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${user.totalScore || 0}</div>
                    <div class="stat-label">Всего очков</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${user.achievements || 0}</div>
                    <div class="stat-label">Достижений</div>
                </div>
            </div>
        </div>

        <div class="achievements">
            <h3>Достижения</h3>
            <div class="achievements-list">
                ${achievementsHtml}
            </div>
        </div>
    `;
}

function updateUserStats(gameResult) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    let user = JSON.parse(currentUser);
    user.gamesPlayed = (user.gamesPlayed || 0) + 1;
    user.totalScore = (user.totalScore || 0) + gameResult.points;

    let newAchievements = 0;
    if (user.totalScore >= 50 && (user.totalScore - gameResult.points) < 50) newAchievements++;
    if (user.totalScore >= 200 && (user.totalScore - gameResult.points) < 200) newAchievements++;
    if (user.gamesPlayed === 1) newAchievements++;
    if (user.gamesPlayed === 5) newAchievements++;
    if (user.gamesPlayed === 10) newAchievements++;

    user.achievements = (user.achievements || 0) + newAchievements;

    localStorage.setItem('currentUser', JSON.stringify(user));

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}