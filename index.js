const canvas = document.querySelector("canvas");
const paragraph = document.querySelector(".info-con")
const ballsNumCon = document.querySelector(".num-con")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

let ballsNum = 0;
if (window.innerWidth < 767) {
  ballsNum = 40;
} else {
  ballsNum = 100;
}
function createColors() {
  const colors = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let randomColor = `#${colors
    .sort(() => Math.random() - 0.5)
    .join("")
    .slice(0, 6)}`;
  return randomColor;
}
const c = canvas.getContext("2d");

// Create a circle "Arc"

//arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined)
//
let radius = 40;

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      let arcColor = createColors();
      c.strokeStyle = arcColor;
      c.stroke();
    };
    this.update = function () {
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };
  }
}

let circleArr;

function init() {
  circleArr = [];

  for (let i = 0; i < ballsNum; i++) {
    let radius = 30;
    let x = Math.random() * (window.innerWidth - radius);
    let y = Math.random() * (window.innerHeight - radius);
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    circleArr.push(new Circle(x, y, dx, dy, radius));
  }
}
function animi() {
  requestAnimationFrame(animi);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArr.forEach((item) => item.update());
}
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
  animi();
});
init();
animi();


document.addEventListener("pointerdown", function (event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  circleArr.forEach((item, i) => {
    const quarter = ballsNum / 4;
    console.log(quarter);
    if (i < quarter + 1) {
      item.x = mouseX + 75;
      item.y = mouseY - 75;
    }
    if (i > quarter && i < quarter * 2 + 1) {
      item.x = mouseX - 75;
      item.y = mouseY - 75;
    }
    if (i > quarter * 2 && i < quarter * 3 + 1) {
      item.x = mouseX - 75;
      item.y = mouseY + 75;
    }
    if (i > quarter * 3 && i < quarter * 4 + 1) {
      item.x = mouseX + 75;
      item.y = mouseY + 75;
    }
  });
});

function hideAddressBar() {
  // Set the height of the body to 100vh initially
  document.body.style.height = window.innerHeight + "px";

  // Detect scroll event
  window.addEventListener("scroll", function () {
    if (!window.scrollY) {
      // If scrolled to the top, set the height to a smaller value
      document.body.style.height = window.innerHeight + 1 + "px";
      setTimeout(function () {
        // Reset the height after a short delay to ensure smooth scrolling
        document.body.style.height = window.innerHeight + "px";
      }, 500);
    }
  });
}

window.onload = hideAddressBar();


