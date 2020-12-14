const fs = require('fs')

console.time('someFunction')
var data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(row => {
    return {
        direction: row[0],
        value: parseInt(row.slice(1))
    }
})
let position = [0, 0]
let currentDir = 90
data.forEach(instruction => {
    switch (instruction.direction) {
        case ('F'):
            var move = moveForward(currentDir, instruction.value)
            position = position.map(function(item, index) {
                return item + move[index];
              })
            break
        case ('N'):
            position[0] += instruction.value
            break;
        case ('E'):
            position[1] += instruction.value
            break;
        case ('S'):
            position[0] -= instruction.value
            break;
        case ('W'):
            position[1] -= instruction.value
            break;
        case ('L'):
            currentDir = changeDir(currentDir, -instruction.value)
            break;
        case ('R'):
            currentDir = changeDir(currentDir, instruction.value)
            break;
        default:
            break;
    }
})
console.log(position.reduce((tot,cur) => Math.abs(tot) + Math.abs(cur)))

function changeDir(currentDir, value) {
    var newDir = currentDir + value
    if (newDir >= 360) newDir -= 360
    if (newDir < 0) newDir += 360
    return newDir
}

function moveForward(currentDir, value) {
    var newValue = [0, 0]
    switch (currentDir) {
        case (0):
            newValue = [value, 0]
            break;
        case (90):
            newValue = [0, value]
            break;
        case (180):
            newValue = [-value, 0]
            break;
        case (270):
            newValue = [0, -value]
            break;
        default:
            break;
    }
    return newValue
}