let G = 100;
let dt = 0.001;
let time = 0;
let trigger = true;

let planets = [];

function setup() {
  createCanvas(800, 800);

  background(0);
  noStroke();
  textSize(40);

  planets.push(new Planet(500, 200, 3, color(255, 0, 0)));
  planets.push(new Planet(500, 600, 2.3, color(0, 255, 0)));
  planets.push(new Planet(200, 500, 4, color(0, 0, 255)));
}

function draw() {
  fill(0, 3);
  rect(0, 0, width, height);

  if (trigger) {
    for (let h = 0; h < 3000; h++) {

      for (let i = 0; i < planets.length; i++) {
        for (let j = 0; j < planets.length; j++) {
          if (i !== j) {
            planets[i].gravity(planets[j]);
          }
        }
      }

      for (let i = 0; i < planets.length; i++) {
        planets[i].move();
      }
    }
  }

  for (let p of planets) {
    p.display();
  }

  fill(0);
  rect(0, 0, 220, 120);

  fill(255);
  text("+" + time.toFixed(3) + "\nx " + dt, 20, 50);

  time += dt;
}

function mousePressed() {
  planets.push(
    new Planet(mouseX, mouseY, 1, color(255, 255, 255))
  );
}

function keyPressed() {
  if (keyCode === ENTER) {
    trigger = !trigger;
  }
}

class Planet {
  constructor(x, y, m, col) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.m = m;
    this.col = col;
  }

  gravity(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;

    let dis2 = dx * dx + dy * dy;

    this.vx +=
      (G * other.m * dx) /
      (dis2 * Math.sqrt(dis2)) * dt;

    this.vy +=
      (G * other.m * dy) /
      (dis2 * Math.sqrt(dis2)) * dt;
  }

  move() {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  display() {
    fill(this.col);
    circle(this.x, this.y, 5);
  }
}
