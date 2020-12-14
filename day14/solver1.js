const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\r\n/)
let mem = {}
let bitmask = ''

data.forEach(row => {
    if (row[1] == 'a') {
        bitmask = row.split(' ')[2]
    } else if (row[1] == 'e') {
        var curVal = parseInt(row.split(' ')[2]).toString(2)
        curVal = new Array(36 - curVal.length + 1).join('0').concat(curVal)
        for (var i = 0; i < bitmask.length; i++) {
            if (bitmask[i] != 'X') {
                curVal = curVal.substr(0, i) + bitmask[i] + curVal.substr(i+1)
            }
        }
        mem[row.slice(4).split(/]/)[0]] = curVal
    }
})
var answer = 0
Object.values(mem).forEach(val => answer += parseInt(val,2))
console.log(answer)
