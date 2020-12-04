const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split('\r\n').map(function(row) {
        var rowArr = [];
        for (var ch of row) {
            if (ch == '#') {
                rowArr.push(true)
            } else {
                rowArr.push(false)
            } 
        }
        return rowArr
        })
    valArr.shift();
    index = 0
    answer = 0
    valArr.forEach((row) => {
        index = index + 3;
        if (index >= row.length) index = index - row.length;
        if (row[index]) answer++;
    })
    console.log(answer)
})