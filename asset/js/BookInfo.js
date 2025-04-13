var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function getPastelColor() {
  const r = Math.floor(200 + Math.random() * 55); // 200~255
  const g = Math.floor(200 + Math.random() * 55);
  const b = Math.floor(200 + Math.random() * 55);
  const a = 0.3 + Math.random() * 0.2; // 0.3~0.5 투명도
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function Circle() {
  this.radius = Math.floor(Math.random() * 30);
  this.originalSize = this.radius;
  this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
  this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
  this.color = getPastelColor();
  this.xVelocity = 1.5 * (Math.random() - Math.random());  // 느리게
  this.yVelocity = 1.5 * (Math.random() - Math.random());

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    this.update();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xVelocity = -this.xVelocity;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.yVelocity = -this.yVelocity;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < 150) {
        this.radius += 1;
      }
    } else if (this.radius !== this.originalSize) {
      this.radius -= 1;
    }
  }
}

var circleArray = [];

for (var i = 0; i < 200; i++) {
  circleArray.push(new Circle());
}

function drawBackgroundGradient() {
  var gradient = c.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#89cff0'); // 위쪽: 옅은 파랑
  gradient.addColorStop(1, '#e6d0ff'); // 아래쪽: 옅은 보라
  c.fillStyle = gradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  drawBackgroundGradient();
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
  }
  requestAnimationFrame(animate);
}

animate();