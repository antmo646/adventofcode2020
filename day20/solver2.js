const { match } = require('assert');
const fs = require('fs');

let data = fs.readFileSync('./day20/input.txt', 'UTF-8').split(/\n\n/).map(element => {
    let pat = element.split(/\n/).slice(1).map(row => row.split(""))
    if (pat.length == 11) pat.pop()
    return {
        id: parseInt(element.split(" ")[1].split(":")[0]),
        pattern: pat,
        up: false,
        right: false,
        down: false,
        left: false
    }
})

let completeBoard = new Map()
completeBoard.set([0, 0].join(), data[0])
data.shift()
let done = false
while (data.length > 0) {
    done = true
    completeBoard.forEach((val, key) => {
        key = key.split(',').map(Number)
        if (val.left == false) {
            done = false
            breakLabel:
            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                for (let k = 0; k < 2; k++) {
                    for (let j = 0; j < 4; j++) {
                        if (tryLeft(val.pattern, el.pattern)) {
                            val.left = el.id
                            el.right = val.id
                            completeBoard.set([key[0] - 1, key[1]].join(), el)
                            data.splice(i, 1)
                            break breakLabel;
                        }
                        el.pattern = rotateRight(el.pattern)
                    }
                    el.pattern = flip(el.pattern)
                }
            }
            if (!val.left) val.left = true
        }
        if (val.right == false) {
            done = false
            breakLabel:
            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                for (let k = 0; k < 2; k++) {
                    for (let j = 0; j < 4; j++) {
                        if (tryRight(val.pattern, el.pattern)) {
                            val.right = el.id
                            el.left = val.id
                            completeBoard.set([key[0] + 1, key[1]].join(), el)
                            data.splice(i, 1)
                            break breakLabel;
                        }
                        el.pattern = rotateRight(el.pattern)
                    }
                    el.pattern = flip(el.pattern)
                }
            };
            if (!val.right) val.right = true
        }
        if (val.up == false) {
            done = false
            breakLabel:
            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                for (let k = 0; k < 2; k++) {
                    for (let j = 0; j < 4; j++) {
                        if (tryUp(val.pattern, el.pattern)) {
                            val.up = el.id
                            el.down = val.id
                            completeBoard.set([key[0], key[1] + 1].join(), el)
                            data.splice(i, 1)
                            break breakLabel;
                        }
                        el.pattern = rotateRight(el.pattern)
                    }
                    el.pattern = flip(el.pattern)
                }
            };
            if (val.up) val.up = true
        }
        if (val.down == false) {
            done = false
            breakLabel:
            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                for (let k = 0; k < 2; k++) {
                    for (let j = 0; j < 4; j++) {
                        if (tryDown(val.pattern, el.pattern)) {
                            val.down = el.id
                            el.up = val.id
                            completeBoard.set([key[0], key[1] - 1].join(), el)
                            data.splice(i, 1)
                            break breakLabel;
                        }
                        el.pattern = rotateRight(el.pattern)
                    }
                    el.pattern = flip(el.pattern)
                }
            };
            if (val.down) val.down = true
        }
        completeBoard.set(key.join(), val)
    })
}

completeBoard.forEach((val, key) => {
    val.pattern = removeBorder(val.pattern)
    completeBoard.set(key, val)
})
let keys = Array.from(completeBoard.keys()).map(r => r.split(',').map(Number))
let maxY = Math.max(...keys.map(r => r[1]))
let minY = Math.min(...keys.map(r => r[1]))
let maxX = Math.max(...keys.map(r => r[0]))
let minX = Math.min(...keys.map(r => r[0]))

let final = []

for (let y = maxY; y >= minY; y--) {
    for (let i = 0; i < completeBoard.get([0, 0].join()).pattern.length; i++) {
        final.push([])
        for (let x = minX; x <= maxX; x++) {
            final[final.length - 1].push(...completeBoard.get([x, y].join()).pattern[i])
        }
    }
}

answerSet = new Set()
let i = 0
while (answerSet.size == 0) {
    if (i == 4) final = flip(final)
    final = rotateRight(final)
    i++
    answerSet = discoverMonster(final)
}
let num = 0
final.forEach(x => num += x.filter(y => y == '#').length)
console.log('answer: ', (num - answerSet.size))

function rotateRight(arr) {
    returnArr = []
    arr.forEach(el => returnArr.push([]))
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < arr[i].length; j++) {
            returnArr[j].push(arr[i][j])
        }
    }
    return returnArr
}

function flip(arr) {
    returnArr = []
    arr.forEach(el => returnArr.push(el.reverse()))
    return returnArr
}

function tryRight(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][arr1.length - 1] != arr2[i][0]) return false
    }
    return true
}

function tryLeft(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0] != arr2[i][arr1.length - 1]) return false
    }
    return true
}

function tryUp(arr1, arr2) {
    for (let i = 0; i < arr1[0].length; i++) {
        if (arr1[0][i] != arr2[arr1.length - 1][i]) return false
    }
    return true
}

function tryDown(arr1, arr2) {
    for (let i = 0; i < arr1[0].length; i++) {
        if (arr1[arr1.length - 1][i] != arr2[0][i]) return false
    }
    return true
}

function removeBorder(arr) {
    arr.shift()
    arr.pop()
    arr.forEach(element => {
        element.shift()
        element.pop()
    })
    return arr
}

function discoverMonster(arr) {
    monsterCoords = new Set()
    let pattern = [[-18, 1], [-13, 1], [-12, 1], [-7, 1], [-6, 1], [-1, 1], [0, 1], [1, 1],
    [-17, 2], [-14, 2], [-11, 2], [-8, 2], [-5, 2], [-2, 2]]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == '#') {
                if (pattern.every(p => {
                    try {
                        return arr[i + p[1]][j + p[0]] == '#'
                    }
                    catch (error) {
                        return false
                    }
                })) {
                    monsterCoords.add([j, i])
                    pattern.forEach(p => monsterCoords.add([j + p[0], i + p[1]]))
                }
            }
        }
    }
    return monsterCoords
}