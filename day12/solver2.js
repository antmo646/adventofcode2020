const fs = require('fs')

console.time('someFunction')
var data = fs.readFileSync('./input.txt', 'UTF-8').split(/\n/).map(row => {
    return {
        direction: row[0],
        value: parseInt(row.slice(1))
    }
})
let position = [0, 0]
let waypointPosition = [1, 10]
data.forEach(instruction => {
    switch (instruction.direction) {
        case ('F'):
            position[0] += waypointPosition[0] * instruction.value
            position[1] += waypointPosition[1] * instruction.value
            break;
        case ('N'):
            waypointPosition[0] += instruction.value
            break;
        case ('E'):
            waypointPosition[1] += instruction.value
            break;
        case ('S'):
            waypointPosition[0] -= instruction.value
            break;
        case ('W'):
            waypointPosition[1] -= instruction.value
            break;
        case ('L'):
            waypointPosition = changeDir(waypointPosition, instruction.value)
            break;
        case ('R'):
            waypointPosition = changeDir(waypointPosition, 360-instruction.value)
            break;
        default:
            break;
    }
})
console.log(position.reduce((tot,cur) => Math.abs(tot) + Math.abs(cur)))


function changeDir(waypointPosition, value) {
    var newPos = waypointPosition
    for (var i = 0; i < value/90; i++) {
        newPos = [newPos[1], -newPos[0]]
    } 
    return newPos   
}