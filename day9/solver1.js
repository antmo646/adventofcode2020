const fs = require('fs')

var valArr = []
var preamble = 25
fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(Number)
    for (var i = preamble; i < valArr.length; i++) {
        var found = false
        for (var j = i-preamble; j < i; j++) {
            for (var k = i-preamble; k < i; k++) {
                if (j != k && valArr[j] + valArr[k] == valArr[i]) found = true;
            }
        }
        if (!found) {
            console.log(valArr[i])
            break
        }
    }
})
