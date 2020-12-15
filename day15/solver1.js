const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/,/).map(Number)

let lastNumSpoken = 0
while (data.length < 2020) {
    lastNumSpoken = data.slice(0, data.length - 1).includes(data[data.length - 1]) ?
        data.length - (data.slice(0, data.length - 1).lastIndexOf(data[data.length - 1]) + 1) : 0
    data.push(lastNumSpoken)
}
console.log(lastNumSpoken)


