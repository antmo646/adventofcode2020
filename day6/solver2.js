const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split(/\n\n/).map(function(arrRow) {
            return arrRow.split(/\n/g)
        })
    var answer = 0

    valArr.forEach(element => {
        var questions = 'abcdefghijklmnopqrstuvwxyz'
        var ch = questions.length;
        while (ch--) {
            var inc = true
            element.forEach(ans => {
                if (!ans.includes(questions[ch])) inc = false
            })
            if (inc) answer++
        }

    });
    console.log(answer)
})