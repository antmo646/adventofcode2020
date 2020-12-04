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
    answer = []
    var slopes = [
        {right: 1, down: 1},
        {right: 3, down: 1},
        {right: 5, down: 1},
        {right: 7, down: 1},
        {right: 1, down: 2}
    ]

    slopes.forEach(slope => {
        var index = 0
        answer.push(0);
        for (var i = slope.down; i < valArr.length; i = i + slope.down) {
            var row = valArr[i]
            index = index + slope.right;
            if (index >= row.length) index = index - row.length;
            if (row[index]) answer[answer.length - 1]++;
        }
    });
    console.log(answer.reduce((tot, cur) => tot*cur))
})