const fs = require('fs');

let data = fs.readFileSync('./day20/input.txt', 'UTF-8').split(/\n\n/).map(element => {
    let pat = element.split(/\n/).slice(1).map(row => row.split(""))
    if (pat.length == 11) pat.pop()
    let edges = [
        pat[0],
        pat[9],
    ]
    let left = []
    let right = []
    for (let index = 0; index < pat.length; index++) {
        left.push(pat[index][0])
        right.push(pat[index][9])
    }
    edges.push(left)
    edges.push(right)

    return {
        id: parseInt(element.split(" ")[1].split(":")[0]),
        pattern: edges
    }
})

let answerArray = []

data.forEach(tile => {
    let sideMatches = 0
    data.forEach(tile2 => {
        if (tile.id == tile2.id) {

        } else {
            if (tile2.pattern.some(x => 
                tile.pattern.some(y => y.join() == x.join() || 
                y.reverse().join() == x.join()))) sideMatches++    
    }
    })
    if (sideMatches == 2) answerArray.push(tile['id'])
})
console.log(answerArray)
console.log('answer', answerArray.reduce((t,c) => t*c))