const canvas = document.getElementById("canvas");
const penColors = document.querySelectorAll("div.pen-color a");
const h1 = document.getElementById("h1");
const clear = document.getElementById("clear-img");
const menuIcon = document.getElementById("menu-icon");
const sideBarHidden = document.getElementById("list-container");
const bars = document.querySelectorAll(".bar");
const form = document.getElementById("form");
const list = document.getElementById("list");
const text = document.getElementById("text");

//canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

context.strokeStyle = "#000";
context.lineWidth = 0.8;
context.lineCap = "round";

let shouldPaint = false;

canvas.addEventListener("mousedown", (event) => {
  shouldPaint = true;
  context.moveTo(event.pageX, event.pageY);
  context.beginPath();
  h1.classList.add("remove-h1");
  clear.classList.add("clear");
});

canvas.addEventListener("mouseup", () => {
  shouldPaint = false;
  saveDrawing();
});

canvas.addEventListener("mousemove", (event) => {
  if (shouldPaint) {
    context.lineTo(event.pageX, event.pageY);
    context.stroke();
  }
});

//clear canvas

clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  h1.classList.remove("remove-h1");
  clear.classList.remove("clear");
  localStorage.removeItem("canvasDrawing");
});

//store canvas in local storage

function saveDrawing() {
  localStorage.setItem("canvasDrawing", canvas.toDataURL());
}

let dataURL = localStorage.getItem("canvasDrawing");
let drawing = new Image();

drawing.src = dataURL;
drawing.onload = function () {
  context.drawImage(drawing, 0, 0);
};

function clearOnLoad() {
  if (dataURL) {
    h1.classList.add("remove-h1");
    clear.classList.add("clear");
  } else {
    return;
  }
}

clearOnLoad();

//circles with pen colors

penColors.forEach((color) => {
  color.addEventListener("click", function (event) {
    context.strokeStyle = this.style.backgroundColor;
  });
});

//Side bar open and close icon

menuIcon.addEventListener("click", () => {
  sideBarHidden.classList.toggle("open");

  if (sideBarHidden.classList.contains("open")) {
    bars.forEach((bar) => {
      bar.classList.add("close");
    });
  } else {
    bars.forEach((bar) => {
      bar.classList.remove("close");
    });
  }
});

//to do list

const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

let tasks = localStorage.getItem("tasks") !== null ? localStorageTasks : [];

function addNewTask(event) {
  event.preventDefault();

  if (text.value.trim() === "") {
    alert(`Please add a task`);
  } else {
    const task = {
      id: generateID(),
      text: text.value,
    };

    tasks.push(task);
    addTaskDOM(task);
    updateLocalStorage();

    text.value = "";
  }
}

function addTaskDOM(task) {
  const item = document.createElement("li");

  item.innerHTML = `
  <div class="task-container">
  <p>${task.text}</p>
  <div onclick="removeTask(${task.id})"><i class="fas fa-check"></i></div>
  </div>
  `;

  list.appendChild(item);
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  updateLocalStorage();

  init();
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function init() {
  list.innerHTML = "";
  tasks.forEach(addTaskDOM);
}

init();

form.addEventListener("submit", addNewTask);
