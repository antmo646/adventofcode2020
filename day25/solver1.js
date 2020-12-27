const csub = 7
const dsub = 7
const divider = 20201227

const fs = require('fs');

let data = fs.readFileSync('./day25/input.txt', 'UTF-8').split(/\n/).map(Number)
const cpub = data[0]
const dpub = data[1]
let foundC = false
let foundD = false 
let i = 1
let loopC 
let loopD = 0
let cval = 1
let dval = 1
while (!foundC || !foundD) {
    cval *= csub
    dval *= dsub
    cval = cval % 20201227
    dval = dval % 20201227
    if (cval === cpub) {
        foundC = true
        loopC = i
    }
    if (dval === dpub) {
        foundD = true
        loopD = i
    }
    i++
}
let answer = 1
for (let j = 0; j < loopC; j++) {
    answer *= dpub
    answer = answer % 20201227
}
console.log(answer)