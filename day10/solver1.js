const fs = require('fs')
const { start } = require('repl')

console.time('someFunction')
var valArr = []
fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(Number)
    valArr.sort((a,b) => a-b)
    var start = 0
    var ones = 0
    var threes = 1
    valArr.forEach(val => {
        if (val-start == 1) ones++
        if (val-start == 3) threes++
        start = val
    })
    console.log(ones*threes)
console.timeEnd('someFunction')
})
