// Тимчасові дані (замінити на ваші)
const faculties = {
    "КН": ["КН-11", "КН-22", "КН-33"],
    "ІПЗ": ["ІПЗ-21", "ІПЗ-32"],
    "ІСТ": ["ІСТ-15", "ІСТ-26"]
};

const schedules = {
    "КН-11": [
        { date: "2023-09-01", subject: "Математика", teacher: "Іванов І.І.", group: "КН-11" },
        { date: "2023-09-01", subject: "Фізика", teacher: "Петрова П.П.", group: "КН-11" }
    ]
};

// Ініціалізація факультетів
function initFaculties() {
    const facultiesDiv = document.getElementById('faculties');
    for (const faculty in faculties) {
        const btn = document.createElement('button');
        btn.className = 'faculty-btn';
        btn.textContent = faculty;
        btn.onclick = () => showGroups(faculty);
        facultiesDiv.appendChild(btn);
    }
}

function showGroups(faculty) {
    const groupsDiv = document.getElementById('groups');
    groupsDiv.innerHTML = '';
    faculties[faculty].forEach(group => {
        const btn = document.createElement('button');
        btn.className = 'group-btn';
        btn.textContent = group;
        btn.onclick = () => showSchedule(group);
        groupsDiv.appendChild(btn);
    });
    document.querySelector('.group-selection').style.display = 'block';
}

function showSchedule(group) {
    const schedule = schedules[group] || [];
    const tbody = document.querySelector('#scheduleTable tbody');
    tbody.innerHTML = '';
    
    schedule.forEach(lesson => {
        const row = tbody.insertRow();
        row.insertCell().textContent = lesson.date;
        row.insertCell().textContent = lesson.subject;
        row.insertCell().textContent = lesson.teacher;
        row.insertCell().textContent = lesson.group;
    });
    
    document.querySelector('.schedule-view').style.display = 'block';
}

function saveSchedule() {
    const group = document.querySelector('.group-btn.active')?.textContent;
    if (!group) return;
    
    const saved = JSON.parse(localStorage.getItem('savedSchedules')) || [];
    if (!saved.includes(group)) {
        saved.push(group);
        localStorage.setItem('savedSchedules', JSON.stringify(saved));
    }
    alert('Розклад збережено!');
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', initFaculties);