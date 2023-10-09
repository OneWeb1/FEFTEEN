class Cells {
  constructor() {
    this.cell = new Cell()
  }

  generateStaticCells(level) {
    const cells = []
    const number = level * level
    let x = 0
    let y = 0

    for (let i = 0; i < number; i++) {
      const cell = this.cell.createCell(i + 1,level)
      const position = { x, y }
      const obj = {
        cell,
        position,
        isEmpty: false
      }
      if (i === number - 1) {
        cell.innerHTML = ""
        cell.id = "cell"
        obj.isEmpty = true
      }
      y = x === level - 1 ? y + 1 : y
      x = x === level - 1 ? 0 : x + 1

      cells.push(obj)
    }

    return cells
  }

  randomCells(cells, level) {
    const positions = []
    const ids = randomRange(0, level*level)
    cells.forEach(cell => {
      const { x, y } = cell.position
      positions.push({ x, y })
    })
    ids.forEach((id, idx) => {
      const { cell, position } = cells[idx]

      cells[idx].position = positions[id]
    })
    return cells
  }


}