const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split('\n').map(function(arrRow) {
        var row = [0, 127]
        var col = [0, 7]
        var i = 0
        for (const v of arrRow) {
            if (i < 7) {
                if (v == 'F') {

                    row = [row[0], Math.floor((row[1]+row[0])/2)] 
                } else {
                    row = [Math.ceil((row[1]+row[0])/2), row[1]] 
                }
            } else {
                if (v == 'L') {
                    col = [col[0], Math.floor((col[1]+col[0])/2)] 
                } else {
                    col = [Math.ceil((col[1]+col[0])/2), col[1]] 
                }
            }
            i++
        }
        //return [row[0], col[0]]
        return row[0]*8 + col[0]
        })
        console.log(Math.max.apply(null, valArr))
})