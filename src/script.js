const canvas = document.getElementById("canvas");
const penColors = document.querySelectorAll("div.pen-color a");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

context.strokeStyle = "#000";
context.lineWidth = 1;
context.lineCap = "round";

let shouldPaint = false;

document.addEventListener("mousedown", (event) => {
  shouldPaint = true;
  context.moveTo(event.pageX, event.pageY);
  context.beginPath();
});

document.addEventListener("mouseup", () => {
  shouldPaint = false;
});

document.addEventListener("mousemove", (event) => {
  if (shouldPaint) {
    context.lineTo(event.pageX, event.pageY);
    context.stroke();
  }
});

penColors.forEach((color) => {
  color.addEventListener("click", function (event) {
    context.strokeStyle = this.style.backgroundColor;
  });
});
