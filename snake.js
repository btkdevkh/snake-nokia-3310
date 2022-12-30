import { getInputDirection } from "./input.js"

export let SNAKE_SPEED = 5
let snakeBody = [{ x: 11, y: 11 }]
let newSegment = 0

export function update() {
  addSegements()

  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameEl) {
  snakeBody.forEach(segment => {
    const snakeEl = document.createElement("div")
    snakeEl.style.gridRowStart = segment.y
    snakeEl.style.gridColumnStart = segment.x

    snakeEl.classList.add("snake")
    gameEl.append(snakeEl)
  })
}

export function expandSnake(amount) {
  newSegment += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPosition(segment, position)
  })
}

function equalPosition(pos_1, pos_2) {
  return pos_1.x === pos_2.x && pos_1.y === pos_2.y
}

function addSegements() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegment = 0
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeInterSection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}
