const container = document.querySelector('#container')
const size = document.querySelector('#size')
const colorPicker = document.querySelector('#color')
const getColorValue = document.querySelector('.color-picker button')
const rainbow = document.querySelector('#rainbow')
const toggle = document.querySelector('#toggleLines')
const eraser = document.querySelector('#eraser')
const clear = document.querySelector('#clear')

const CONTAINER_SIZE = 600
let gridSize = 16
let color = "rgb(51, 51, 51)"
let isRandom = false
let isErasing = false

createGrid(gridSize)

size.addEventListener('click', getSize)
toggle.addEventListener('click', toggleGridlines)
getColorValue.addEventListener('click', () => {
  isRandom = false
  isErasing = false
  color = colorPicker.value
})
rainbow.addEventListener('click', () => {
  isErasing = false
  isRandom = !isRandom
})
eraser.addEventListener('click', () => {
  isRandom = false
  isErasing = !isErasing
})
clear.addEventListener('click', clearGrid)

function createGrid (gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const square = document.createElement('div')
      container.appendChild(square)

      square.style.height = `${CONTAINER_SIZE / gridSize}px`
      square.style.width = `${CONTAINER_SIZE / gridSize}px`
      container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  
      square.addEventListener('mouseover', () => {
        if (isRandom) {
          square.style.background = getRandomColor()
        } else if (isErasing) {
          square.style.background = 'white' 
        } else {
          square.style.background = color
        }
      })
    }
  }
}

function getSize () {
  gridSize = prompt('Enter a grid size: ')
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr);`
  clearGrid()
}

function toggleGridlines () {
  for (let i = 0; i < gridSize * gridSize; i++) {
    container.children[i].classList.toggle('gridlines')
  }
}

function getRandomColor () {
  const x = Math.floor(Math.random() * 255)
  const y = Math.floor(Math.random() * 255)
  const z = Math.floor(Math.random() * 255)

  return `rgb(${x}, ${y}, ${z})`
}

function clearGrid () {
  while (container.firstChild) {
    container.removeChild(container.lastChild)
  }
  createGrid(gridSize)
}