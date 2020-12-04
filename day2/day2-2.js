const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split('\r\n').map(function(row) {
        return {
                pos1: parseInt(row.split(':')[0].split('-')[0]-1),
                pos2: parseInt(row.split(':')[0].split('-')[1].split(' ')[0])-1,
                letter: row.split(':')[0].slice(-1),
                password: row.split(':')[1].slice(1)
            }
    })
    answer = 0;
    valArr.forEach((val) => {
        if (val.password.charAt(val.pos1) == val.letter || val.password.charAt(val.pos2) == val.letter) answer ++;
        if (val.password.charAt(val.pos1) == val.letter && val.password.charAt(val.pos2) == val.letter) answer --;
    })
    console.log(answer)
})