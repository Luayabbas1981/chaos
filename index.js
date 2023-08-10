const canvas = document.querySelector("canvas");
const paragraph = document.querySelector(".info-con");
const ballsNumCon = document.querySelector(".num-con");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

let ballsNum = parseInt(window.innerWidth / 7);

function randomNumber(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
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
    .slice(0, 6)}80`;
  return randomColor;
}
const c = canvas.getContext("2d");

// Create a circle "Arc"

//arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined)
//

let mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("pointermove", function (event) {
  if (isMobile) {
    return;
  }
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
let radius = 10;
const maxRadius = 75;
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.isEffected = false;
    this.color = createColors();
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      if (isMobile) {
        const ballFilled = parseInt(ballsNum / 1.1);
        circleArr.forEach((item, i) => {
          if (i < ballFilled) {
            item.isEffected = true;
          }
        });
      }
      if (this.isEffected) {
        c.fillStyle = this.color;
        c.fill();
      } else {
        c.strokeStyle = this.color;
        c.stroke();
      }
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

      if (
        mouse.x - this.x < 150 &&
        mouse.x - this.x > -150 &&
        mouse.y - this.y < 150 &&
        mouse.y - this.y > -150 &&
        this.radius < maxRadius
      ) {
        this.radius += 1;
        this.isEffected = true;
      } else if (this.radius > radius) {
        this.radius -= 1;
        setTimeout(() => {
          this.isEffected = false;
        }, 1000);
      }
      this.draw();
    };
  }
}

let circleArr;

function init() {
  circleArr = [];

  for (let i = 0; i < ballsNum; i++) {
    let radius = 35;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    let arcColor = createColors();
    circleArr.push(new Circle(x, y, dx, dy, radius));
    c.strokeStyle = arcColor;
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

window.addEventListener("pointerdown",function(){
  circleArr.forEach((item)=>{
    if(isMobile && item.isEffected === true)
    item.color = createColors()
  })
})
/* window.addEventListener("pointerdown", function (event) {
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
 */
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
