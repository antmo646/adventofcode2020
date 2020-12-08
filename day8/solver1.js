const fs = require('fs')

var valArr = []
fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(function(row) {
            return ({
                operation: row.split(' ')[0],
                argument: parseInt(row.split(' ')[1])
            })
        })

        var visited = []
        var answer = 0
    valArr.forEach(function (row, index) {
        tempArr = valArr.slice(0)
        if (row.operation == 'nop') {
            tempArr[index] = {operation: 'jmp', argument: row.argument}
        } else if (row.operation == 'jmp') {
            tempArr[index] = {operation: 'nop', argument: row.argument}
        } 
        for (var i = 0; i < tempArr.length; i++) {
            if  (visited.includes(i)) break;
            visited.push(i)
            switch (tempArr[i].operation) {
                case ('acc'):
                    answer += tempArr[i].argument
                    break;
                case ('jmp'):
                    i += tempArr[i].argument - 1
                    break;
                case ('nop'):
                    break;
                default:
            }
            if (i >= tempArr.length - 1) {
                console.log(answer)
            } 
        }

        answer = 0
        visited = []
    })
})
