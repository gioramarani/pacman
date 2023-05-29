'use strict'

const GHOST = '👻'
var gGhosts
var gDeadGhost = []
var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        color: getRandomColor(),
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
    
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts:', gGhosts)

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(!gPacman.gIsSuper) {
            gameOver() 
        return
        } else {
           setInterval(removeGhost(nextCell), 5000)
        }
    }
    

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    // console.log(ghost);
    return `<span style="background:${ghost.color}">${GHOST}</span>`
}

function changeGhostsColor(){
    for(var i=0; i< gGhosts.length; i++){
        gGhosts[i].color = gPacman.isSuper ? 'blue' : getRandomColor()
    }
}

// function removeGhost(location){
//     var currGhost = location.innerText
//     var deadGhosts = []
//     var deadGhost = gGhosts.splice(currGhost, 1)
//     deadGhosts.push[deadGhost]
// }

function removeGhost(location){ // loc -> {i,j}
    var ghostIdx
    //find the ghost idx that we eat
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if(currGhost.location.i === location.i && currGhost.location.j === location.j){
            ghostIdx = i
            break
        }
    }
    //get the ghost object
    const removedGhost = gGhosts.splice(ghostIdx,1)[0] // splice will return [splicedItem]
    //check if the ghost has a food inside
    if(removeGhost.currCellContent === FOOD){
        gFoodLeftOnBoardCounter--
        removeGhost.currCellContent = EMPTY
    }
    gDeadGhost.push(removedGhost)
}

function bringDeadGhosts(){
    gGhosts.push(...gDeadGhost) // [ghost1, ghost2] ... ghost, ghost1
}