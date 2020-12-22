const fs = require('fs');

let data = fs.readFileSync('./day19/input.txt', 'UTF-8').split(/\n/)

let allRules = new Map()
for (let index = 0; index < data.indexOf(""); index++) {
    const element = data[index];
    allRules.set(parseInt(element.split(':')), element)
}

let messages = data.slice(data.indexOf("") + 1)
let matchingStrings8 = calculateRules([8])
let matchingStrings31 = calculateRules([31])



let answer = 0
let valid = []
for (m of messages) {
    let numOf8 = 0
    let numOf31 = 0
    let foundOne = true
    let saveForLater = m
    while (foundOne) {
        if (m.length == 0 && numOf8 > numOf31 && numOf31 > 0) {
            answer++
            valid.push(saveForLater)
            break;
        }
        foundOne = false
        if (numOf31 == 0) {
            matchingStrings8.forEach(m8 => {
                if (m.startsWith(m8)) {
                    m = m.slice(m8.length)
                    foundOne = true
                    numOf8++
                }
            })
        }
        if (!foundOne) {
            matchingStrings31.forEach(m31 => {
                if (m.startsWith(m31)) {
                    m = m.slice(m31.length)
                    foundOne = true
                    numOf31++
                }
            })
        }
    }
}

console.log("Answer:", answer)

function calculateRules(rules) {
    let matchSet = []
    for (index of rules) {
        let rule = allRules.get(index)
        if (rule.includes('"')) {
            matchSet.push([rule.split('"')[1]])
        } else {
            let subRules = []
            if (rule.includes('|')) {
                subRules = rule.split(':')[1].split('|').map(set => {
                    set = set.trim().split(' ').map(Number)
                    return set
                })
            } else {
                subRules = [rule.split(':')[1].trim().split(' ').map(Number)]
            }
            let subSubRules = []
            subRules.forEach(subRule => {
                subSubRules.push(...calculateRules(subRule))
            })
            matchSet.push(subSubRules)
        }
    }
    return combine(matchSet)
}

function combine(matchSet) {
    let result = []
    matchSet[0].forEach(item => {
        if (matchSet.length > 1) {
            let combiner = combine(matchSet.slice(1))
            combiner.forEach(item2 => {
                result.push(item + item2)
            })
        } else {
            result.push(item)
        }
    })
    return result
}