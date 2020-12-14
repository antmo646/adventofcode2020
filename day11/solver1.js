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
            let adjacents = []
            let empty = 0
            let occu = 0
            adjacents.push([x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
                [x-1, y], [x+1, y],
                [x - 1, y + 1], [x, y + 1], [x + 1, y + 1])
            adjacents.forEach(adj => {
                if (typeof grid[adj[1]] != 'undefined' && typeof grid[adj[1]][adj[0]] != 'undefined') {
                    switch (grid[adj[1]][adj[0]]) {
                        case ('L'):
                            empty++
                            break;
                        case ('#'):
                            occu++
                            break;
                        case ('.'):
                            break;
                        default:
                            break;
                    }
                }
            })
            switch (grid[y][x]) {
                case ('L'):
                    if (occu == 0) updatedGrid[y] = updatedGrid[y].substring(0, x) + '#' + updatedGrid[y].substring(x+1);
                    break;
                case ('#'):
                    if (occu > 3) updatedGrid[y] = updatedGrid[y].substring(0, x) + 'L' + updatedGrid[y].substring(x+1);
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