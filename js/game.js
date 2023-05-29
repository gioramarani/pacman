'use strict'
// לא מופיע הדובדבן
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '&'
const CHERRY = '🍒'
var gCherryCount = 0
var gFoodLeftOnBoardCounter = 0
var gSize

const gGame = {
    score: 0,
    isOn: false
}
var gBoard


function onInit() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard)
    gGame.isOn = true
    document.querySelector('.modal').style.display = 'none'
    setInterval(placeOfCherry, 15000)

}

function buildBoard() {
    gSize = 10
    const board = []

    for (var i = 0; i < gSize; i++) {
        board.push([])

        for (var j = 0; j < gSize; j++) {
            board[i][j] = FOOD
            gFoodLeftOnBoardCounter++

            if (i === 0 || i === gSize - 1 ||
                j === 0 || j === gSize - 1 ||
                (j === 3 && i > 4 && i < gSize - 2)) {
                    board[i][j] = WALL
                    gFoodLeftOnBoardCounter--
                }
                if ((i === 1 && j === 1) ||
                (i === 1 && j === gSize-2) ||
                (i === gSize-2 && j === 1) ||
                (i === gSize-2 && j === gSize -2)){
                    board[i][j] = SUPERFOOD
                    gFoodLeftOnBoardCounter--
                }

                console.log(gFoodLeftOnBoardCounter)
            }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`) // cell-8-6
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (!gFoodLeftOnBoardCounter) gameWon()
    console.log('gFoodLeftOnBoard',gFoodLeftOnBoardCounter) 
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(placeOfCherry)
    renderCell(gPacman.location, EMPTY)
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.user-msg').innerText = 'Game Over'
}

function gameWon(){
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(placeOfCherry)
    renderCell(gPacman.location, EMPTY)
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.user-msg').innerText = 'Victorious!'
}


   

function placeOfCherry(){
    const cellWithFood = getRandomCellOfFood()
    console.log(cellWithFood)
    if (!cellWithFood) return

    gBoard[cellWithFood.i][cellWithFood.j] = CHERRY
    renderCell(cellWithFood ,CHERRY)
    
}

function getRandomCellOfFood(){
    const foodPoss = []
    for (var i= 0; i < gSize; i++){
        for(var j=0; j < gSize; j++){
            if(gBoard[i][j]===EMPTY){
               
                foodPoss.push({i,j})
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, foodPoss.length-1)
    return foodPoss[randIdx]
}