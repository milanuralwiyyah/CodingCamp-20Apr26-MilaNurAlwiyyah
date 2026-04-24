// ===== TIME & GREETING =====
function updateTime() {
    const now = new Date();

    document.getElementById("time").innerText =
        now.toLocaleTimeString();

    document.getElementById("date").innerText =
        now.toDateString();

    let hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    document.getElementById("greeting").innerText = greeting;
}
setInterval(updateTime, 1000);


// ===== TIMER =====
let time = 1500;
let interval;

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    time = 1500;
    updateTimer();
}


// ===== TASK =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
            <div class="task-item">
                <span>${task}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value === "") return;

    if (tasks.includes(value)) {
        alert("Task already exists!");
        return;
    }

    tasks.push(value);
    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();


// ===== LINKS =====
let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks() {
    const container = document.getElementById("links");
    container.innerHTML = "";

    links.forEach((link, index) => {
        container.innerHTML += `
            <a href="${link}" target="_blank" class="link-item">${link}</a>
        `;
    });

    localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
    const input = document.getElementById("linkInput");
    const value = input.value.trim();

    if (value === "") return;

    links.push(value);
    input.value = "";
    renderLinks();
}

renderLinks();