const fs = require('fs')

let data = fs.readFileSync('./day17/input.txt', 'UTF-8').split(/\n/)
let activeCells = new Map()
let upcomingCellStates = new Map()
data.forEach((r,y) => {
    for (var x = 0; x < r.length; x++) {
        if (r[x] == '#') activeCells.set(JSON.stringify([x,y,0,0]), [x,y,0,0])//activeCells.push([x,y,0,0])
    }
})

for (let i = 0; i < 6; i++) {
    console.log("LENGTH:", activeCells.size)
    upcomingCellStates.clear()
    activeCells.forEach((value,cell) => {
        calcCellState(value)
    })
    activeCells = new Map(upcomingCellStates)
}
console.log(activeCells.size)

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
                for (let w = cell[3]-1; w < cell[3]+2; w++) {
                    neighbours.push([x,y,z,w])
                }
            }
        }
    }
    neighbours.splice(40, 1);
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
    if (activeCells.has(JSON.stringify(cell))) return true
    return false
}

function isAdded(cell) {
    if (upcomingCellStates.has(JSON.stringify(cell))) return true
    return false
}

function determineIfActive(cell) {
    let numActNei = activeNeighbours(getNeighbours(cell)).length
    if ((numActNei === 2 || 
    numActNei === 3)  && 
    isActive(cell) && !isAdded(cell)) {
        upcomingCellStates.set(JSON.stringify(cell), cell)
    } else if (numActNei === 3 &&
    !isActive(cell) && !isAdded(cell)) {
        upcomingCellStates.set(JSON.stringify(cell), cell)
    }
}