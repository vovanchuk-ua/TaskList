let tasks = [];
let completedTasks = [];
let nCompletedTasks = [];

function sortCtgr(){
    completedTasks = []
    nCompletedTasks = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            completedTasks.push(tasks[i]);
        }
        else {
            //console.log(tasks[i].status);
            nCompletedTasks.push(tasks[i]);
        }
    }
}

function addTask(taskPar) {
    console.log(taskPar);
    let newTask = {
        id: tasks.length + 1,
        title: taskPar[0],
        description: taskPar[1],
        completed: taskPar[2],
        time: taskPar[3],
    };
    tasks.push(newTask);
    //console.log(taskPar);
    updateTaskView()
}

function deleteTask(curTask) {
    //console.log(curTask);
    let taskIndex = -1;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === curTask) {
            taskIndex = i;
            break;
        }
    }
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
    updateTaskView();
}

function changeStatus(curTask) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === curTask) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    updateTaskView();
}

function updateTaskView() {
    sortCtgr()
    let choice = document.getElementById('selectTaskView');
    if (choice.value === "active") {taskView(nCompletedTasks)}
    else if (choice.value === "closed") {taskView(completedTasks)}
    else {taskView(tasks)}

}

function taskView(taskList) {
    let container = document.getElementById('taskView');
    container.innerHTML = '';
    for (let task of taskList) {
        let div = document.createElement('div');
        div.classList.add('noteItem');
        let title = document.createElement('h3');
        title.textContent = `${task.title}`;
        let text = document.createElement('pre');
        text.textContent = `${task.description}`;
        let time = document.createElement('p');
        time.textContent = `${task.time}`;
        let statusButton = document.createElement('button');
        if (task.completed) {
            statusButton.textContent = 'Не виконано';
            title.classList.add('completedTask');
            text.classList.add('completedTask');
            statusButton.onclick = function () {updateTaskView()}
        } else {
            statusButton.textContent = 'Виконано!';
            title.classList.remove('completedTask');
            text.classList.remove('completedTask');
            statusButton.onclick = function () {updateTaskView()}
        }
        statusButton.onclick = function() { changeStatus(task.id); }
        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Видалити"
        deleteButton.onclick = function() { deleteTask(task.id); }
        let editButton = document.createElement('button');
        editButton.textContent = "Редагувати";
        editButton.onclick = function() { openEditModal(task.id); };
        div.appendChild(title);
        div.appendChild(text);
        div.appendChild(time);
        div.appendChild(statusButton);
        div.appendChild(deleteButton);
        div.appendChild(editButton);
        container.appendChild(div);
    }
}

function newTaskModal() {
    const modalContainer = document.getElementById("modalContainer");
    const modalHTML = `
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="closeBtn">&times;</span>
        <h2>Додати завдання</h2>
        <form id="modalForm">
          <label for="titleField">Заголовок завдання:</label>
          <input type="text" id="titleField" name="title" placeholder="Введіть заголовок">
          <label for="descriptionField">Опис завдання:</label>
          <textarea id="descriptionField" name="description" placeholder="Введіть опис"></textarea>
          <button type="submit">Додати завдання</button>
        </form>
      </div>
    </div>`;
    modalContainer.innerHTML = modalHTML;
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".closeBtn");
    const form = document.getElementById("modalForm");

    modal.style.display = "block";

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("titleField").value;
        const description = document.getElementById("descriptionField").value;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const time = `${hours}:${minutes}`;
        addTask([title, description, false, time]);
        modal.style.display = "none";
    });
}

function openEditModal(taskId) {
    let task;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            task = tasks[i];
            break;
        }
    }

    if (task) {
        const modalContainer = document.getElementById("modalContainer");
        const modalHTML = `
        <div id="modal" class="modal">
          <div class="modal-content">
            <span class="closeBtn">&times;</span>
            <h2>Редагувати завдання</h2>
            <form id="modalForm">
              <label for="titleField">Заголовок завдання:</label>
              <input type="text" id="titleField" name="title" placeholder="Введіть заголовок" value="${task.title}">
              <label for="descriptionField">Опис:</label>
              <textarea id="descriptionField" name="description" placeholder="Введіть опис">${task.description}</textarea>
              <button type="submit">Оновити завдання</button>
            </form>
          </div>
        </div>`;
        modalContainer.innerHTML = modalHTML;
        const modal = document.getElementById("modal");
        const closeBtn = document.querySelector(".closeBtn");
        const form = document.getElementById("modalForm");

        modal.style.display = "block";

        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const title = document.getElementById("titleField").value;
            const description = document.getElementById("descriptionField").value;
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            updateTask(taskId, [title, description, false, time]);
            modal.style.display = "none";
        });
    }
}

function updateTask(taskId, taskPar) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            tasks[i].title = taskPar[0];
            tasks[i].description = taskPar[1];
            tasks[i].time = 'Редаговано о '+ taskPar[3];
            break;
        }
    }
    updateTaskView();
}

updateTaskView()
