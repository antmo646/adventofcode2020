const fs = require('fs')

var data = fs.readFileSync('./input.txt', 'UTF-8')

var busses = data.split(/(\n)/)[2].split(',')
var bus1 = parseInt(busses[0])

for (var i = 0;; i++) {
    if (i % bus1 == 0) {
        importantBusses = []
        for (var j = 1;j < busses.length; j++){
            if (isNumeric(busses[j])) {
                importantBusses.push([j, parseInt(busses[j])])
            }
        }
        var curMult = bus1
        while (importantBusses.length > 0) {
            if ((i+importantBusses[0][0]) % (importantBusses[0][1]) == 0) {
                curMult *= importantBusses[0][1];
                importantBusses.shift()
                continue
            }
            i += curMult
            
        }
        console.log(i)
        break
    }
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
