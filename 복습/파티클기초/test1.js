const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

class Particle {
    constructor(x, y, width, height, vy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vy = vy;
    }

    update() {
        this.y += this.vy;
    }
    draw() {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}

const TOTAL = 100;
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + 1;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const width = randomNumBetween(0, 1);
    const height = randomNumBetween(10, 100);
    const vy = randomNumBetween(5, 10);
    const particle = new Particle(x, y, width, height, vy);

    particles.push(particle);
}

console.log(particles);

let intervals = 1000 / 60;
let now, delta;
let then = Date.now();

function animation() {
    window.requestAnimationFrame(animation);
    now = Date.now();
    delta = now - then;

    if (delta < intervals) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();

        if (particle.y - particle.height > canvasHeight) {
            particle.x = randomNumBetween(0, canvasWidth);
            particle.y = randomNumBetween(0, 0);
            particle.width = randomNumBetween(0, 1);
            particle.height = randomNumBetween(10, 100);
            particle.vy = randomNumBetween(5, 10);
        }
    });

    then = now - (delta % intervals);
}

animation();
