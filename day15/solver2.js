const fs = require('fs')

let dataDict = {}
let iteration = 0
let last = 0
let data = fs.readFileSync('./input.txt', 'UTF-8').split(/,/)
data.forEach((element, i) => {
    if (i === data.length-1) {
        last = element
        iteration = i
    } else {
        dataDict[element] = i
    }
});

let lastNumSpoken = 0
console.time("time")
while (iteration < 30000000-1) {
    temp = last
    if (temp in dataDict) {
        last = iteration - dataDict[temp] 
    } else {
        last = 0
    }
    dataDict[temp] = iteration
    iteration++
    if (iteration % 1000000 == 0) console.log("iteration: " + iteration)
}
console.log(last)
console.timeEnd("time")