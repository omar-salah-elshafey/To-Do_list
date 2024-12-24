const taskInput = document.querySelector("#task-name");
let createBtn = document.querySelector("#create-button");
let tasksArray = [];
let taskList = document.querySelector(".task-list");
let task = document.querySelector(".task");
let deleteAll = document.querySelector("#deleteAll");
let tasks = getFromLocalStorage();
if (tasks) {
  tasksArray = tasks;
}
onload = function () {
  taskInput.focus();
  showTasks();
};
// create the task
createBtn.onclick = function () {
  if (taskInput.value !== "") {
    addTaskToArray(taskInput);
    taskInput.value = "";
  }
  console.log(tasksArray);
  saveToLocalStorage();
  showTasks();
};
// function to add task to array
function addTaskToArray(taskInput) {
  let taskItem = {
    id: Date.now(),
    name: taskInput.value,
    completed: false,
  };
  tasksArray.push(taskItem);
}
//show all tasks on the page
function showTasks() {
  taskList.innerHTML = "";
  tasksArray.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) {
      taskElement.classList.add("task-done");
    }
    taskElement.setAttribute("data-id", task.id);
    taskElement.innerHTML = `
            <p>${task.name}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
    taskList.appendChild(taskElement);
  });
}
// add data to local storage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
// get data from local storage
function getFromLocalStorage() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasksArray = JSON.parse(storedTasks);
  }
}
// delete a task from array and local storage
function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id !== taskId);
  saveToLocalStorage();
  showTasks();
}
// update task status
function updateTaskStatus(taskId) {
  for (let index = 0; index < tasksArray.length; index++) {
    if (tasksArray[index].id == taskId) {
      tasksArray[index].completed == false
        ? (tasksArray[index].completed = true)
        : (tasksArray[index].completed = false);
      //   tasksArray[index].completed = !tasksArray[index].completed;
      saveToLocalStorage(tasksArray);
      showTasks();
    }
  }
}
// add event listener to toggle the task to done
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("task-done");
    updateTaskStatus(e.target.getAttribute("data-id"));
  }
});

function deleteAllProducts() {
  localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    tasksArray = [];
}
