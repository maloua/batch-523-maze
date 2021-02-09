// show hint on button click
const button = document.querySelector("#show-hint");
const hint = document.querySelector(".hint");

button.addEventListener('click', () => {
	hint.classList.toggle("active");
})

// ******** THE GAME **********

// abstracted logic to swap tiles
const moveTile = (tile, empty) => {
	empty.classList.remove("empty")
	empty.innerText = tile.innerText

	tile.classList.add("empty")
	tile.innerText = ""
}

// abstracted logic to check if the clicked tile has the empty one adjacent to it
const canMove = (tile, empty) => {
	const col = tile.cellIndex // which kid am I - 1 (or: how many children came before me?)
	const row = tile.parentElement.rowIndex // which row am I in - 1 (or: how many rows came before me?)

	const emptyCol = empty.cellIndex
	const emptyRow = empty.parentElement.rowIndex

	// empty and clicked tile are on the same row, and only 1 column apart
	const rightIsEmpty = row === emptyRow && emptyCol === (col + 1)
	const leftIsEmpty = row === emptyRow && emptyCol === (col - 1)

	// empty and clicked tile are in the same column, and only 1 row apart
	const aboveIsEmpty = emptyRow === (row - 1) && emptyCol === col
	const belowIsEmpty = emptyRow === (row + 1) && emptyCol === col

	// if any of these is true (and at most 1 will be), the empty tile is adjacent to the clicked tile
	return rightIsEmpty || leftIsEmpty || aboveIsEmpty || belowIsEmpty

	// ALTERNATIVE
	//
	// const horizontal = row === emptyRow && (emptyCol === col + 1 || emptyCol === col - 1)
	// const vertical = col === emptyCol && (emptyRow === row + 1 || emptyRow === row - 1)
	//
	// return horizontal || vertical
}

// find all the tiles
const tiles = document.querySelectorAll("table tr td") // NodeList ("array" of elements)

// for all the tiles
tiles.forEach((tile) => { // tile is an element like <td>17</td>
	// listen to "click" event
	tile.addEventListener('click', () => {
		const empty = document.querySelector("td.empty")
		
		if (canMove(tile, empty)) moveTile(tile, empty)
	})
})

