const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/,/).map(Number)

let lastNumSpoken = 0
console.time("time")
while (data.length < 30000000) {
    var temp = data[data.length - 1]
    data.pop()
    index = (data.lastIndexOf(temp) + 1)
    data.push(temp)
    lastNumSpoken = index === 0 ? 0 : data.length - index 
    data.push(lastNumSpoken)
    if (data.length % 100000 == 0) console.log(data.length, lastNumSpoken)
}
console.log(lastNumSpoken)
console.timeEnd("time")
    