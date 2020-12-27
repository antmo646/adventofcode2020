const fs = require('fs');

let data = fs.readFileSync('./day24/input.txt', 'UTF-8').split(/\n/).map(r => {
    r = r.replace(/e/g, 'e,')
    r = r.replace(/w/g, 'w,')
    r = r.split(',')
    r.pop()
    return r
})
let tileMap = new Map()
console.log(data)
data.forEach(tile => {
    sp = [0, 0, 0]
    for (let i = 0; i < tile.length; i++) {
        const element = tile[i];
        switch (element) {
            case 'ne':
                if (sp[0] == 0 && sp[1] != 0 && sp[2] != 0) sp = add(sp, [0,-1,-1])
                else sp = add(sp, [1,0,0])
                break;
            case 'e':
                if (sp[1] == 0) sp = add(sp, [1,0,1])
                else sp = add(sp, [0,-1,0])
                break;
            case 'se':
                if (sp[0] != 0 && sp[1] != 0 && sp[2] == 0) sp = add(sp, [-1,-1,0])
                else sp = add(sp, [0,0,1])
                break;
            case 'sw':
                if (sp[0] == 0) sp = add(sp, [0,1,1])
                else sp = add(sp, [-1,0,0])
                break;
            case 'w':
                if (sp[0] != 0 && sp[1] == 0 && sp[2] != 0) sp = add(sp, [-1,0,-1])
                else sp = add(sp, [0,1,0])
                break;
            case 'nw':
                if (sp[2] == 0) sp = add(sp, [1,1,0])
                else sp = add(sp, [0,0,-1])
                break;
            default:
                break;
        }
    }
    tileMap.set(sp.join(), !tileMap.has(sp.join()) || !tileMap.get(sp.join()) ? true : false)
})

console.log(tileMap)
let answer = 0
for(item of tileMap.values()) {
    if (item) answer++
}
console.log(answer)

function add(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        arr1[i] += arr2[i]      
    }
    return arr1
}