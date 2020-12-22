const fs = require('fs');

let data = fs.readFileSync('./day22/input.txt', 'UTF-8')

let p1 = data.split(/\n\n/)[0].split(/\n/).map(Number)
p1.shift()
let p2 = data.split('Player 2:')[1].split(/\n/).map(Number)
p2.shift()

winner = game(p1, p2)[1]

let score = 0

for (let i = 0; i < winner.length; i++) {
    score += (i + 1) * winner[i]
}
console.log(score)

function game(p1, p2) {
    let gameOver = false
    let seenP1 = new Map()
    let seenP2 = new Map()
    let winnerName = ''
    let winner = []
    while (!gameOver) {
        if (seenP1.has(p1.join()) || seenP2.has(p2.join())) {
            winnerName = 'p1'
            winner = p1
            break
        }
        seenP1.set(p1.join(), 1)
        seenP2.set(p2.join(), 1)


        let r1 = p1.shift()
        let r2 = p2.shift()

        if (r1 <= p1.length && r2 <= p2.length) {
            game(p1.slice(0, r1), p2.slice(0, r2))[0] == 'p1' ? p1.push(r1, r2) : p2.push(r2, r1)
        } else {
            r1 > r2 ? p1.push(r1, r2) : p2.push(r2, r1)
        }

        if (p1.length === 0 || p2.length === 0) {
            winner = p1.length > p2.length ? p1.reverse() : p2.reverse()
            winnerName = p1.length > p2.length ? 'p1' : 'p2'
            gameOver = true
        }
    }
    return [winnerName, winner]
}