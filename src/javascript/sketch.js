let lines = [];
let increment = 0.05;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  strokeJoin(ROUND);
  stroke(255);
  fill(0);

  for (let y = 60; y < height; y += 16) {
    let line = new SquigglyLine(y);
    lines.push(line);
  }
}

function draw() {
  background(0);

  noiseDetail(2, 0.5);

  for (let i = 0; i < lines.length; i++) {
    lines[i].phi += 1 / 30;
    lines[i].draw(i);
  }
}

class SquigglyLine {
  constructor(y) {
    this.y = y;
    this.xoff = random(10000);
    this.Xoff = this.xoff;
    this.phi = random(10000);
  }

  draw(i) {
    beginShape();

    this.xoff = this.Xoff; // reset xoff

    for (let x = -2; x < width + 2; x++) {
      let k = 0;
      if (x > width / 3 && x < 2 * width / 3) {
        k = map(x, width / 3, 2 * width / 3, 0, 180);
      }

      let amplitude = 5;
      let frequency = 0.02;
      let y = -abs(sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + sin(radians(k)) * 50)) + this.y;

      vertex(x, y);

      this.xoff += increment;
    }

    vertex(width + 2, height + 2);
    vertex(-2, height + 2);
    endShape(CLOSE);
  }
}