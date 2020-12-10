const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split(/\n\n/).map(function(arrRow) {
            return (new Set(arrRow.replace(/\n/g, '').split(''))).size
        })
        console.log(valArr.reduce((tot, cur) => tot+cur))
})