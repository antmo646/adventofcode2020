const fs = require('fs')

console.time('someFunction')
var data = fs.readFileSync('./input.txt', 'UTF-8')
var timestamp = parseInt(data.split(/(\n)/)[0])
var busses = data.split(/(\n)/)[2].split(',').filter(x => x != 'x').map(Number)
var bestBus = [10000000, 1]
busses.forEach(bus => {
    for (var i = 0; i < timestamp+bus; i+=bus) {
        if (i >= timestamp &&  i-timestamp < bestBus[0]) bestBus = [i-timestamp, bus]
    }
})
console.log(bestBus[0]*bestBus[1])
