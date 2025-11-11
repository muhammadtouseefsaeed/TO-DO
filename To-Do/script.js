const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const remainingList = document.getElementById("remainingTasks");
const completedList = document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  remainingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("task-btns");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(index);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = () => toggleTask(index);

    btnDiv.append(editBtn, delBtn, toggleBtn);
    li.appendChild(btnDiv);

    task.completed ? completedList.appendChild(li) : remainingList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task!");
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
window.addEventListener("load", renderTasks);
