# ⚡ Reflex Game

A fast-paced reflex game built using **HTML5 Canvas** and **JavaScript**.  
Click the red circles as they appear to score points — but be careful! Clicking a green circle ends the game.

---

## 🎮 Live Demo

🚀 [Play the Game (GitHub Pages)](https://GeoChriss.github.io/Reflex-Game/)

---

## 🧠 How to Play

- Red circles will appear randomly on the canvas.
- ✅ Click red circles to score points.
- ❌ Clicking a green circle ends the game instantly.
- ⏱️ You have 30 seconds to get as many points as possible.
- Keep an eye on your score and try to beat your high score!

---

## 🔧 Built With

- **HTML5 Canvas** – for drawing and animations
- **Vanilla JavaScript** – no libraries needed
- **CSS** – for UI and styling


---

## 🛠️ Game Mechanics (How It Works)

### Game Loop
- Uses `requestAnimationFrame` to redraw the canvas continuously.
- A `setInterval` spawns new circles every 500ms while the game is active.

### Circles
- Red = score point
- Green = decoy (game over if clicked)
- Each circle exists for 1–3 seconds before disappearing.

### Scoring
- Points are tracked and displayed live.
- Top score is stored and updated if beaten.

### Timer
- Countdown starts at 30 seconds.
- Game ends when time runs out or a green circle is clicked.

---

## 📦 Getting Started

To run the game locally:

```bash
git clone https://github.com/GeoChriss/reflex-game.git
cd reflex-game

