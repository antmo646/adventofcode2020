const fs = require('fs')

let data = fs.readFileSync('./day17/input.txt', 'UTF-8').split(/\n/)
let activeCells = []
let upcomingCellStates = []
data.forEach((r,y) => {
    for (var x = 0; x < r.length; x++) {
        if (r[x] == '#') activeCells.push([x,y,0])
    }
})

for (let i = 0; i < 6; i++) {
    console.log(activeCells.length)
    upcomingCellStates = []
    activeCells.forEach(cell => calcCellState(cell))
    activeCells = upcomingCellStates.slice()
}
console.log(activeCells.length)

function calcCellState(cell) {
    let neighbours = getNeighbours(cell)
    determineIfActive(cell)
    neighbours.forEach(neighbour => {
        determineIfActive(neighbour)
    })
}

function getNeighbours(cell) {
    let neighbours = []
    for (let x = (cell[0]-1); x < (cell[0]+2); x++) {
        for (let y = cell[1]-1; y < cell[1]+2; y++) {
            for (let z = cell[2]-1; z < cell[2]+2; z++) {
                neighbours.push([x,y,z])
            }
        }
    }
    neighbours.splice(13, 1);
    return neighbours
}

function activeNeighbours(neighbours) {
    let actNei = []
    neighbours.forEach((n,i) => {
        if (isActive(n)) {
            actNei.push(n)
        }
    })
    return actNei
}

function isActive(cell) {
    for (let i = 0; i < activeCells.length; i++) {
        if (JSON.stringify(cell) === JSON.stringify(activeCells[i])) {
            return true;
        }
    }
    return false
}

function isAdded(cell) {
    for (let i = 0; i < upcomingCellStates.length; i++) {
        if (JSON.stringify(cell) === JSON.stringify(upcomingCellStates[i])) {
            return true;
        }
    }
    return false
}

function determineIfActive(cell) {
    let numActNei = activeNeighbours(getNeighbours(cell)).length
    if ((numActNei === 2 || 
    numActNei === 3)  && 
    isActive(cell) && !isAdded(cell)) {
        upcomingCellStates.push(cell)
    } else if (numActNei === 3 &&
    !isActive(cell) && !isAdded(cell)) {
        upcomingCellStates.push(cell)
    }
}