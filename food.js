import { expandSnake, onSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

let food = getRandomFoodPosition()
const EXPANSION_RATE = 3

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)

    food = getRandomFoodPosition()
  }
}

export function draw(gameEl) {
  const foodEl = document.createElement("div")
  foodEl.style.gridRowStart = food.y
  foodEl.style.gridColumnStart = food.x

  foodEl.classList.add("food")
  gameEl.append(foodEl)
}

function getRandomFoodPosition() {
  let newFoodPosition

  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }

  return newFoodPosition
}
