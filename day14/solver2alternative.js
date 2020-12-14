const fs = require('fs')
const { up } = require('inquirer/lib/utils/readline')
const { start } = require('repl')

let valArr = []
fs.readFile('./day11/input.txt', 'UTF-8', function (err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/)
    while (JSON.stringify(valArr) != JSON.stringify(seatChanger(valArr))){
        valArr = seatChanger(valArr).slice(); 
    }
    console.log(JSON.stringify(valArr).split('#').length-1)
})


function seatChanger(grid) {
    let updatedGrid = grid.slice()
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let occu = getAdjecants(grid, [y,x])
            switch (grid[y][x]) {
                case ('L'):
                    if (occu == 0) updatedGrid[y] = updatedGrid[y].substring(0, x) + '#' + updatedGrid[y].substring(x+1);
                    break;
                case ('#'):
                    if (occu > 4) updatedGrid[y] = updatedGrid[y].substring(0, x) + 'L' + updatedGrid[y].substring(x+1);
                    break;  
                case ('.'):
                    break;
                default:
                    break;
            }
        }
    }
    return updatedGrid;
}

function getAdjecants(grid, cur) {
    let occu = 0
    var neighbourPaths = [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1],[0,1], [1,1]]
    neighbourPaths.forEach(path => occu += getVisualNeighbour(grid, cur, ...path))
    return occu

}

function getVisualNeighbour(grid,start,x,y) {
    var cur = [start[0] + y, start[1] + x]
    while (cur[0] >= 0 && cur[1] >= 0 && cur[0] < grid.length && cur[1] < grid[0].length) {
        if (grid[cur[0]][cur[1]] != '.'){
            if (grid[cur[0]][cur[1]] == '#') return 1
            break
        }
        var cur = [cur[0] + y, cur[1] + x]
    }
    return 0
}