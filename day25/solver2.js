const fs = require('fs');

let data = fs.readFileSync('./day24/input.txt', 'UTF-8').split(/\n/).map(r => {
    r = r.replace(/e/g, 'e,')
    r = r.replace(/w/g, 'w,')
    r = r.split(',')
    r.pop()
    return r
})
let tileMap = new Map()
let max = [0, 0, 0]
data.forEach(tile => {
    sp = [0, 0, 0]
    for (let i = 0; i < tile.length; i++) {
        const element = tile[i];
        switch (element) {
            case 'ne':
                if (sp[0] == 0 && sp[1] != 0 && sp[2] != 0) sp = add(sp, [0, -1, -1])
                else sp = add(sp, [1, 0, 0])
                break;
            case 'e':
                if (sp[1] == 0) sp = add(sp, [1, 0, 1])
                else sp = add(sp, [0, -1, 0])
                break;
            case 'se':
                if (sp[0] != 0 && sp[1] != 0 && sp[2] == 0) sp = add(sp, [-1, -1, 0])
                else sp = add(sp, [0, 0, 1])
                break;
            case 'sw':
                if (sp[0] == 0) sp = add(sp, [0, 1, 1])
                else sp = add(sp, [-1, 0, 0])
                break;
            case 'w':
                if (sp[0] != 0 && sp[1] == 0 && sp[2] != 0) sp = add(sp, [-1, 0, -1])
                else sp = add(sp, [0, 1, 0])
                break;
            case 'nw':
                if (sp[2] == 0) sp = add(sp, [1, 1, 0])
                else sp = add(sp, [0, 0, -1])
                break;
            default:
                break;
        }
    }
    max = [Math.max(max[0], sp[0]), Math.max(max[1], sp[1]), Math.max(max[2], sp[2])]
    tileMap.set(sp.join(), !tileMap.has(sp.join()) || !tileMap.get(sp.join()) ? true : false)
})

let answer1 = 0
for (item of tileMap.values()) {
    if (item) answer1++
}
console.log(answer1)
let newMap = new Map()
for (let i = 0; i < 100; i++) {
    for (let x = 0; x <= max[0] + 1; x++) {
        for (let y = 0; y <= max[1] + 1; y++) {
            for (let z = 0; z <= max[2] + 1; z++) {
                if (![x,y,z].includes(0)) break;
               newMap.set([x, y, z].join(), bow([x, y, z],
                   !tileMap.has([x, y, z].join()) || !tileMap.get([x, y, z].join()) ? false : true))
            }
        }
    }
    max[0]++
    max[1]++
    max[2]++
    tileMap = new Map(newMap)
    let answer = 0
    for (item of tileMap.values()) {
        if (item) answer++
    }
    console.log("day " + (i + 1), answer)
}



function add(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        arr1[i] += arr2[i]
    }
    return arr1
}

function bow2(tile, black) {
    let neighbours = []
    //NE
    if (tile[0] == 0 && tile[1] != 0 && tile[2] != 0) {
        neighbours.push(add(tile.slice(), [0, -1, -1]))
    } else {
        neighbours.push(add(tile.slice(), [1, 0, 0]))
    }
    //E
    if (tile[1] == 0) {
        neighbours.push(add(tile.slice(), [1, 0, 1]))
    } else {
        neighbours.push(add(tile.slice(), [0, -1, 0]))
    }
    //SE
    if (tile[0] != 0 && tile[1] != 0 && tile[2] == 0) {
        neighbours.push(add(tile.slice(), [-1, -1, 0]))
    } else {
        neighbours.push(add(tile.slice(), [0, 0, 1]))
    }
    //SW
    if (tile[0] == 0) {
        neighbours.push(add(tile.slice(), [0, 1, 1]))
    } else {
        neighbours.push(add(tile.slice(), [-1, 0, 0]))
    }
    //W
    if (tile[0] != 0 && tile[1] == 0 && tile[2] != 0) {
        neighbours.push(add(tile.slice(), [-1, 0, -1]))
    } else {
        neighbours.push(add(tile.slice(), [0, 1, 0]))
    }
    //NW
    if (tile[2] == 0) {
        neighbours.push(add(tile.slice(), [1, 1, 0]))
    } else {
        neighbours.push(add(tile.slice(), [0, 0, -1]))
    }
    let count = 0
    neighbours.forEach(n => {
        if (tileMap.get(n.join()) === true) count++
    })
    if (black && (count == 0 || count > 2)) {
        return false
    }
    if (!black && count == 2) {
        return true
    }
    return black
}
