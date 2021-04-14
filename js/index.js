(function goLife(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const sizeField = 600
    canvas.width = canvas.height = sizeField
    const numberOfCells = 60
    const cellSize = sizeField / numberOfCells

    let field = []
    let gameBegin = null

    canvas.onclick = event => {
        let x = event.offsetX
        let y = event.offsetY
        x = Math.floor(x / cellSize)
        y = Math.floor(y / cellSize)
        field[y][x] = +!field[y][x]
        paintCell()
    }

    function drawTheFieldWithZeros() {
        for (let i = 0; i < numberOfCells; i++) {
            field[i] = []
            for (let j = 0; j < numberOfCells; j ++) {
                field[i][j] = 0
            }
        }
    }
    drawTheFieldWithZeros()

    function paintCell() {
        ctx.clearRect(0, 0, sizeField, sizeField)
        for(let i = 0; i < numberOfCells; i++) {
            for(let j = 0; j < numberOfCells; j++) {
                if (field[j][i] === 1) {
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
                }
            }
        }
    }

    const checkFirstEl = el => el === 0 ? numberOfCells : el
    const checkLastEl = el => el === numberOfCells -1 ? -1 : el
    function startLife() {
        let newField = []
        for (let i = 0; i < numberOfCells; i++) {
            newField[i] = []
            for (let j = 0; j < numberOfCells; j ++) {
                let neighborCounter = 0
                if (field[i][checkFirstEl(j) - 1] === 1) neighborCounter++   //  left
                if (field[i][checkLastEl(j) + 1] === 1) neighborCounter++   //  right
                if (field[checkFirstEl(i) - 1][j] === 1) neighborCounter++  //  top
                if (field[checkLastEl(i) + 1][j] === 1) neighborCounter++   //  bottom
                if (field[checkFirstEl(i) - 1][checkLastEl(j) + 1]) neighborCounter++   //  top right
                if (field[checkFirstEl(i) - 1][checkFirstEl(j) - 1]) neighborCounter++   //  top left
                if (field[checkLastEl(i) + 1][checkLastEl(j) + 1]) neighborCounter++   //  bottom right
                if (field[checkLastEl(i) + 1][checkFirstEl(j) - 1]) neighborCounter++   //  bottom left
                (((neighborCounter === 2 || neighborCounter === 3) && field[i][j] === 1) || (neighborCounter === 3 && field[i][j] === 0))
                    ? newField[i][j] = 1
                    : newField[i][j] = 0
            }
        }
        field = newField
        paintCell()
        gameBegin = setTimeout(startLife, 50)

    }

    const startBtn = document.getElementById('start')
    const clearBtn = document.getElementById('clear')
    const stopBtn = document.getElementById('stop')

    startBtn.onclick = () => {
        startLife()
    }
    stopBtn.onclick = () => {
        clearTimeout(gameBegin)
    }
    // clearBtn.onclick = () => {
        // drawTheFieldWithZeros()
    // }
})()