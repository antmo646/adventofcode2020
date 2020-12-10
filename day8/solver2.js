const fs = require('fs')

var valArr = []
fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(function(row) {

        })
})
