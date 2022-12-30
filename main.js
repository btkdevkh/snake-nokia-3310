import {
  SNAKE_SPEED,
  draw as drawSnake,
  update as updateSnake,
  getSnakeHead,
  snakeInterSection,
} from "./snake.js"
import { update as upDateFood, draw as drawFood } from "./food.js"
import { outSideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false
const gameEl = document.querySelector("[data-game]")

function main(currentTime) {
  if (gameOver) {
    if (confirm("Lose ! Press ok to restart")) {
      location.reload()
    }

    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  upDateFood()
  checkDeath()
}

function draw() {
  gameEl.innerHTML = ""
  drawSnake(gameEl)
  drawFood(gameEl)
}

function checkDeath() {
  gameOver = outSideGrid(getSnakeHead()) || snakeInterSection()
}
