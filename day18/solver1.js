const fs = require('fs')

2 * 3 + (4 * 5)
let data = fs.readFileSync('./day18/input.txt', 'UTF-8').split(/\n/)

let answer = 0
data.forEach(row => {
    answer += calculator(row)
});
console.log("answer:", answer)

function calculator(row) {
    let rowSum = 0
    let lastOperator = '+'
    for (let index = 0; index < row.length; index++) {
        let element = row[index]
        if (/^[0-9]$/.test(element)) {
            rowSum = doMathOperation(lastOperator, rowSum, parseInt(element))
        } else if (element === '('){
            let innerRes = innerCalc(row.slice(index+1))
            rowSum = doMathOperation(lastOperator, rowSum, innerRes[0])

            index += innerRes[1]+1
        } else if (element === ' ') {
            continue
        } else {
            lastOperator = element
        }
    }
    return rowSum
}

function innerCalc(row) {
    let rowSum = 0
    let lastOperator = '+'
    let i = 0
    for (let index = 0; index < row.length; index++) {
        let element = row[index]
        i = index
        if (/^[0-9]$/.test(element)) {
            rowSum = doMathOperation(lastOperator, rowSum, parseInt(element))
        } else if (element === '(') {
            let innerRes = innerCalc(row.slice(index+1))
            rowSum = doMathOperation(lastOperator, rowSum, innerRes[0])
            index += innerRes[1]+1
        } else if (element === ' ') {
            continue
        } else if (element === ')') {
        break;
        } else {
            lastOperator = element
        }
    }
    return [rowSum, i]
}

function doMathOperation(operator, left, right) {
    let result = 0
    switch (operator) {
        case '+': 
            result = left + right
            break;
        case '-': 
            result = left - right
            break;
        case '*': 
            result = left * right
            break;
        case '/': 
            result = left / right
            break;
        default:
            break;
    }
    return result
}