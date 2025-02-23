function loadSavedItems() {
    // Збережені розклади
    const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules')) || [];
    const schedulesList = document.getElementById('savedSchedulesList');
    schedulesList.innerHTML = savedSchedules.length > 0 
        ? '' 
        : '<div class="empty-message">Немає збережених розкладів</div>';

    savedSchedules.forEach(group => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        item.innerHTML = `
            <div class="saved-item-header">
                <i class="fas fa-calendar-day"></i>
                <h3>${group}</h3>
            </div>
            <button class="control-btn danger" onclick="window.location.href='schedule.html#${group}'">
                Перейти
            </button>
        `;
        schedulesList.appendChild(item);
    });

    // Збережені рейтинги
    const savedRatings = Object.keys(localStorage)
        .filter(key => key.startsWith('rating_'))
        .map(key => ({
            key: key,
            name: key.replace('rating_', ''),
            data: JSON.parse(localStorage.getItem(key))
        }));
    
    const ratingsList = document.getElementById('savedRatingsList');
    ratingsList.innerHTML = savedRatings.length > 0 
        ? '' 
        : '<div class="empty-message">Немає збережених рейтингів</div>';

    savedRatings.forEach(rating => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        item.innerHTML = `
            <div class="saved-item-header">
                <i class="fas fa-chart-line"></i>
                <div>
                    <h3>${rating.name}</h3>
                    <p>Загальний рейтинг: ${rating.data.R?.toFixed(2) || 'Н/Д'}</p>
                </div>
            </div>
            <div class="button-group">
                <button class="control-btn primary" onclick="showRatingDetails('${rating.key}')">
                    Деталі
                </button>
                <button class="control-btn danger" onclick="deleteRating('${rating.key}', this)">
        <i class="fas fa-trash"></i> Видалити </button>
            </div>
        `;
        ratingsList.appendChild(item);
    });
}

function deleteRating(key, button) {
    if (confirm('Видалити цей рейтинг?')) {
        localStorage.removeItem(key);
        button.closest('.saved-item').remove();
        // Оновлення списку після видалення
        if (document.getElementById('savedRatingsList').children.length === 0) {
            document.getElementById('savedRatingsList').innerHTML = 
                '<div class="empty-message">Немає збережених рейтингів</div>';
        }
    }
}

function showRatingDetails(key) {
    const ratingData = JSON.parse(localStorage.getItem(key));
    localStorage.setItem('currentRatingDetails', JSON.stringify(ratingData));
    window.location.href = 'rating-details.html';
}

document.addEventListener('DOMContentLoaded', loadSavedItems);