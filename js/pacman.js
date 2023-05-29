'use strict'

const PACMAN = '😀'
var gPacman


function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodLeftOnBoardCounter--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if(!gPacman.isSuper) {
            gameOver() 
        return
        } else {
         removeGhost(nextLocation)
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodLeftOnBoardCounter--
    }
    if(nextCell === SUPERFOOD){
        if(gPacman.isSuper) return
        gPacman.isSuper = true
        changeGhostsColor()
        setTimeout(endSuperPower, 5000)// run the function endSuperPower after 5 sec  
    }
    if(nextCell === CHERRY) {
        gCherryCount += 10
        updateScore(10)
    }
    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}


function endSuperPower(){
    gPacman.isSuper = false
    console.log('not super');
    bringDeadGhosts()
    changeGhostsColor()
}