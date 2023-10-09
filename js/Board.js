class Board {
	constructor(settings) {
		Object.assign(this, { settings })

		this.cells = new Cells()
		this.positions = []
		this.root = this.create()
		//this.create()
	}

	create() {
		const board = document.createElement('div')
		board.classList.add('board')
		return board
	}

	append(node) {
		node.appendChild(this.root)
	}

	uploadCells() {
		this.root = document.querySelector(this.settings.root)
		this.cells.level = this.level
		this.staticCells = this.cells.generateStaticCells(this.level)
		this.staticCells = this.cells.randomCells(this.staticCells, this.level)
		this.renderCells(this.staticCells)
		this.generateWinPositions()
	}

	renderCells(cells) {
		const box = this.getCellStaticPosition()
		this.root.innerHTML = ''
		cells.forEach(item => {
			const x = item.position.x * box.width + box.x
			const y = item.position.y * box.height + box.y
			item.cell.onclick = e => this.clickHandler(item)
			item.position.left = x
			item.position.top = y
			this.cells.cell.translate(item.cell, x, y)
			this.root.appendChild(item.cell)
		})
	}

	clickHandler(item) {
		if (item.cell.getAttribute('id')) return

		const emptyObjectCell = this.getEmptyCell()
		const emptyCell = emptyObjectCell.cell
		let emptyPosition = emptyObjectCell.position
		if (this.cells.cell.isMove(item.position, emptyPosition)) {
			let savePosition = {
				x: item.position.x,
				y: item.position.y,
				left: item.position.left,
				top: item.position.top,
			}
			this.cells.cell.translate(
				item.cell,
				emptyPosition.left,
				emptyPosition.top
			)
			this.cells.cell.translate(
				emptyCell,
				item.position.left,
				item.position.top
			)
			item.position = {
				x: emptyPosition.x,
				y: emptyPosition.y,
				left: emptyPosition.left,
				top: emptyPosition.top,
			}
			emptyObjectCell.position = {
				x: savePosition.x,
				y: savePosition.y,
				left: savePosition.left,
				top: savePosition.top,
			}
		}
		if (this.isWin()) alert('Ви виграли! КБ-22-1')
	}

	generateWinPositions() {
		const positions = []
		for (let i = 0; i < this.level; i++) {
			for (let j = 0; j < this.level; j++) {
				positions.push({
					x: j,
					y: i,
				})
			}
		}

		this.winPositions = positions
	}

	isWin() {
		for (let i = 0; i < this.staticCells.length; i++) {
			const item = this.staticCells[i]
			const position = item.position
			const winPosition = this.winPositions[i]
			if (position.x !== winPosition.x || position.y !== winPosition.y)
				return false
		}

		return true
	}

	getEmptyCell() {
		for (let i = 0; i < this.staticCells.length; i++) {
			const cell = this.staticCells[i]
			if (cell.isEmpty) return cell
		}
		return null
	}

	getCellStaticPosition() {
		const cell = this.cells.cell.createCell(0, this.level)
		this.root.appendChild(cell)
		const box = cell.getBoundingClientRect()
		this.root.removeChild(cell)
		return box
	}
}
