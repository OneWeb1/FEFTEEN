class Cell {
  constructor() {

  }

  createCell(number, level) {
    console.log(level)
    const cell = document.createElement("div")
    const cellChild = document.createElement("div")
    const p = document.createElement("p")
    cell.classList.add("cell")
    p.textContent = number
    cell.style.width = `${360/level}px`
    cell.style.height = `${360/level}px`
    cell.style.fontSize = `${140/level}px`
    cell.style.padding = `${10/level}px`
    cellChild.style.borderRadius = `${70/level}px`
    cellChild.append(p)
    cell.appendChild(cellChild)

    return cell
  }

  translate(cell, x, y) {
    cell.style.left = `${x}px`
    cell.style.top = `${y}px`
  }

  isMove(position, emptyPosition) {

    const faces = [
      {
        x: emptyPosition.x - position.x === 1,
        y: emptyPosition.y - position.y === 0
        },
      {
        x: emptyPosition.x - position.x === 0,
        y: emptyPosition.y - position.y === 1
        },
      {
        x: emptyPosition.x - position.x === -1,
        y: emptyPosition.y - position.y === 0
        },
      {
        x: emptyPosition.x - position.x === 0,
        y: emptyPosition.y - position.y === -1
        },
      ]

    for (let i = 0; i < faces.length; i++) {
      let isX = emptyPosition.x - position.x
      if (faces[i].x && faces[i].y) return true
    }
    return false
  }
}