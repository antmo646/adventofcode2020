const fs = require('fs');
const { rawListeners } = require('process');

let data = fs.readFileSync('./day19/input.txt', 'UTF-8').split(/\n/)

let allRules = new Map()
for (let index = 0; index < data.indexOf(""); index++) {
    const element = data[index];
    allRules.set(parseInt(element.split(':')), element)
}

let messages = data.slice(data.indexOf("") + 1)

let rules = allRules.get(0).split(' ').splice(1).map(Number)

let matchingStrings = calculateRules(rules)
console.log(matchingStrings)

let answer = 0
for (m of messages) {
    if (matchingStrings.includes(m)) answer++
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
    finalMatchSet = []

    matchSet[0].forEach(item => {
        if (matchSet.length > 1) {
            matchSet[1].forEach(item2 => {
                if (matchSet.length > 2) {
                    matchSet[2].forEach(item3 => {
                        finalMatchSet.push(item + item2 + item3)
                    })
                } else {
                    finalMatchSet.push(item + item2)
                }
            })
        } else {
            finalMatchSet.push(item)
        }
    })
    return finalMatchSet
}


