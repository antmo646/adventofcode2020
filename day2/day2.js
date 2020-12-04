const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split('\r\n').map(function(row) {
        return {policy: row.split(':')[0],
                password: row.split(':')[1]}
    })
    answer = 0;
    valArr.forEach((val) => {
        var num = 0;
        for (ch of val.password) {
            if (ch == val.policy.slice(-1)) num++;
        }
        if (num < parseInt(val.policy.split('-')[0]) || num > parseInt(val.policy.split('-')[1].split(' ')[0])) answer++;
    })
    console.log(1000 - answer)
})