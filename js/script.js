// ===== TIME =====
function updateTime() {
    const now = new Date();

    // JAM (24 JAM)
    document.getElementById("time").innerText =
        now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

    // TANGGAL (ENGLISH)
    document.getElementById("date").innerText =
        now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    // GREETING
    let hour = now.getHours();
    let greeting = hour < 12 ? "Good Morning" :
                   hour < 18 ? "Good Afternoon" : "Good Evening";

    document.getElementById("greeting").innerText = greeting;
}
setInterval(updateTime, 1000);


// ===== TIMER =====
let time = 1500;
let interval;

function updateTimer() {
    let m = Math.floor(time / 60);
    let s = time % 60;

    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? '0' : ''}${s}`;
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
                <div class="task-left">
                    <input type="checkbox" ${task.done ? "checked" : ""}
                        onchange="toggleTask(${index})">
                    <span class="${task.done ? "completed" : ""}">
                        ${task.text}
                    </span>
                </div>
                <button class="task-delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (!value) return;

    tasks.push({ text: value, done: false });
    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
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
            <div class="link-item">
                <button class="link-delete" onclick="deleteLink(${index})">✖</button>
                <a href="${link.url}" target="_blank">${link.name}</a>
            </div>
        `;
    });

    localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
    const name = document.getElementById("linkName").value.trim();
    const url = document.getElementById("linkURL").value.trim();

    if (!name || !url) return;

    links.push({ name, url });

    document.getElementById("linkName").value = "";
    document.getElementById("linkURL").value = "";

    renderLinks();
}

function deleteLink(index) {
    links.splice(index, 1);
    renderLinks();
}

renderLinks();