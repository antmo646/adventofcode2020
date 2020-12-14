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
            let adjacents = getAdjecants(grid, [y,x])
            let empty = adjacents[0]
            let occu = adjacents[1]
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
    let empty = 0
    let occu = 0

    var x = cur[1]-1
    for (let y = cur[0]-1; y >= 0 && x >= 0; y--) {
        if (grid[y][x] == 'L') {
            empty++
            break;
        } else if (grid[y][x] == '#') {
            occu++
            break;
        }
        x--
    }

    direction:
    for (let y = cur[0]-1; y >= 0; y--) {
        if (grid[y][cur[1]] == 'L') {
            empty++
            break direction;
        } else if (grid[y][cur[1]] == '#') {
            occu++
            break direction;
        }
    }

    x = cur[1]+1
    for (let y = cur[0]-1; y >= 0 && x < grid[0].length; y--) {
        if (y < 0) break
        if (grid[y][x] == 'L') {
            empty++
            break;
        } else if (grid[y][x] == '#') {
            occu++
            break;
        }
        x++
    }

    direction:
    for (let x = cur[1]-1; x >= 0; x--) {
        if (grid[cur[0]][x] == 'L') {
            empty++
            break direction;
        } else if (grid[cur[0]][x] == '#') {
            occu++
            break direction;
        }
    }

    direction:
    for (let x = cur[1]+1; x < grid[0].length; x++) {
        if (grid[cur[0]][x] == 'L') {
            empty++
            break direction;
        } else if (grid[cur[0]][x] == '#') {
            occu++
            break direction;
        }
    }

    x = cur[1]-1
    for (let y = cur[0]+1; y < grid.length && x >= 0; y++) {
        if (grid[y][x] == 'L') {
            empty++
            break;
        } else if (grid[y][x] == '#') {
            occu++
            break;
        }
        x--
    }

    direction:
    for (let y = cur[0]+1; y < grid.length; y++) {
        if (grid[y][cur[1]] == 'L') {
            empty++
            break direction;
        } else if (grid[y][cur[1]] == '#') {
            occu++
            break direction;
        }
    }

    x = cur[1]+1
    for (let y = cur[0]+1; y < grid.length && x < grid[0].length; y++) {
        if (grid[y][x] == 'L') {
            empty++
            break;
        } else if (grid[y][x] == '#') {
            occu++
            break;
        }
        x++
    }
    return [empty, occu]
}