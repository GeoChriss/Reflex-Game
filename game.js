const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('playButton');
const replayButton = document.getElementById('replayButton');
const scoreElement = document.getElementById('score');
const topScoreElement = document.getElementById('topScore');

// Game Settings
const canvasWidth = 500;
const canvasHeight = 400;
const backgroundColor = "#18230F";

// Game variables
let score = 0;
let topScore = 0;
let timeLeft = 30;
let gameActive = false;
let circles = [];
let gameLoop;
let timerInterval;

window.onload = function() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    startButton.addEventListener("click", startGame);
    replayButton.addEventListener("click", startGame);
    
    document.addEventListener("keydown", function(e) {
        if ((!gameActive) && (e.code === "Space" || e.code.startsWith("Arrow"))) {
            startGame();
        }
    });

    // Initial background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

class Circle {
    constructor() {
        this.radius = Math.random() * 20 + 10;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.isRed = Math.random() < 0.6;
        this.duration = Math.random() * 2000 + 1000;
        this.createdAt = Date.now();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isRed ? '#ff4444' : '#4CAF50';
        ctx.fill();
        ctx.closePath();
    }

    isExpired() {
        return Date.now() - this.createdAt > this.duration;
    }

    containsPoint(x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <= this.radius;
    }
}

function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    circles = [];
    updateScore();
    
    startButton.classList.add("hidden");
    replayButton.classList.add("hidden");
    
    const statsElement = document.querySelector('.game-over-stats');
    if (statsElement) statsElement.remove();

    if (gameLoop) clearInterval(gameLoop);
    if (timerInterval) clearInterval(timerInterval);

    gameLoop = setInterval(createCircle, 500);
    timerInterval = setInterval(updateTimer, 1000);
    requestAnimationFrame(update);
}

function updateScore() {
    scoreElement.textContent = score;
    if (score > topScore) {
        topScore = score;
        topScoreElement.textContent = topScore;
    }
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        handleGameOver();
    }
}

function handleGameOver() {
    gameActive = false;
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'game-over-stats';
    statsDiv.innerHTML = `
        <div>Final Score: ${score}</div>
        <div>Top Score: ${topScore}</div>
    `;
    document.getElementById('game-container').appendChild(statsDiv);
    replayButton.classList.remove("hidden");
}

function createCircle() {
    if (gameActive) {
        circles.push(new Circle());
    }
}

function update() {
    if (!gameActive) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    circles = circles.filter(circle => !circle.isExpired());
    circles.forEach(circle => circle.draw());

    requestAnimationFrame(update);
}

canvas.addEventListener('click', (e) => {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i];
        if (circle.containsPoint(x, y)) {
            if (circle.isRed) {
                score++;
                updateScore();
                circles.splice(i, 1);
            } else {
                handleGameOver();
            }
            break;
        }
    }
});