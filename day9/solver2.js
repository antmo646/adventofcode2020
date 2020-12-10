const fs = require('fs')
var valArr = []
var invNum = 21806024
fs.readFile('./input.txt', 'UTF-8', function (err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(Number)
    for (var i = 0; i < valArr.length; i++) {
        var sum = 0
        var range = []
        for (var j = i; sum < invNum; j++) {
            sum += valArr[j]
            range.push(valArr[j])
            if (sum == invNum) {
                console.log(Math.min(...range) + Math.max(...range))
                throw new Error("Found Solution");
            }
        }
    }
})
