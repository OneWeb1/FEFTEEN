class Game {
	constructor() {
		this.board = new Board({
			root: '.board',
			cells: {
				size: 75,
			},
		})
		this.levelMode = [3, 4, 5, 6, 7, 8]
		this.level = this.levelMode[1]
		this.board.level = this.level

		this.init()

		window.onload = e => this.loadHandler()
		window.onresize = e => this.resizeHandler()
	}

	init() {
		this.selectModeHandler()
		this.startHandler()
		this.back()
	}

	selectModeHandler() {
		const buttonsSelectMode = document.querySelectorAll('.button-select__mode')

		const removeActiveClass = () => {
			buttonsSelectMode.forEach(button => {
				if (button.classList.toggle('mode-active')) {
					button.classList.remove('mode-active')
				}
			})
		}
		buttonsSelectMode.forEach((button, idx) => {
			button.onclick = e => {
				removeActiveClass()
				button.classList.add('mode-active')
				this.level = this.levelMode[idx]
				this.board.level = this.level
			}
		})
	}

	startHandler() {
		const uiWrapper = document.querySelector('.ui-wrapper')
		const wrapper = document.querySelector('.wrapper')
		const buttonStart = document.querySelector('.button-start')
		const headerText = document.querySelector('.header-text')

		buttonStart.onclick = e => {
			uiWrapper.style.display = 'none'
			wrapper.style.display = 'block'
			headerText.textContent = `${this.level}x${this.level}`
			this.start()
		}
	}

	back() {
		const uiWrapper = document.querySelector('.ui-wrapper')
		const wrapper = document.querySelector('.wrapper')
		const icon = document.querySelector('.icon')
		console.log(icon)
		icon.onclick = () => {
			uiWrapper.style.display = 'block'
			wrapper.style.display = 'none'
		}
	}

	start() {
		this.board.append(document.querySelector('.wrapper'))
		this.board.uploadCells()
	}

	resizeHandler() {
		this.board.renderCells(this.board.staticCells)
	}

	loadHandler() {
		//this.board.uploadCells()
	}
}
