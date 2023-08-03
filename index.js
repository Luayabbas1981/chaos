const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

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
  constructor(x,y,dx,dy,radius) {
    this.x = x
    this.y = y
    this.dx= dx
    this.dy = dy
    this.radius = radius;
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      let arcColor = createColors();
      c.strokeStyle = arcColor;
      c.stroke();
    };
    this.update = function (){
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
          }
          if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
          }
          this.x += this.dx;
          this.y += this.dy;
          this.draw()
    }
  }
}

let circleArr = []
let ballsNum=0
if(window.innerWidth <767){
    ballsNum= 50
}else{
    ballsNum=300
}
for(let i=0;i<400;i++){
let radius = 30    
let x = Math.random() * (window.innerWidth - radius*2) +radius;
let y = Math.random() * (window.innerHeight - radius*2) + radius;
let dx = (Math.random() - 0.5) *4;
let dy = (Math.random() - 0.5) *4;
    circleArr.push(new Circle(x,y,dx,dy,radius)) ;
}

function animi() {
  requestAnimationFrame(animi);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArr.forEach(item=> item.update())
}
animi()