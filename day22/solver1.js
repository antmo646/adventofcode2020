const fs = require('fs');

let data = fs.readFileSync('./day22/input.txt', 'UTF-8')

let p1 = data.split(/\n\n/)[0].split(/\n/).map(Number)
p1.shift()
let p2 = data.split('Player 2:')[1].split(/\n/).map(Number)
p2.shift()

let gameOver = false

while (!gameOver) {
    let r1 = p1.shift()
    let r2 = p2.shift()
    r1 > r2 ? p1.push(r1,r2) : p2.push(r2,r1)
    if (p1.length === 0 || p2.length === 0) gameOver = true
}
const winner = p1.length > p2.length ? p1.reverse() : p2.reverse()

let score = 0

for (let i = 0; i < winner.length; i++) {
    score += (i+1) * winner[i]
}
console.log(score)