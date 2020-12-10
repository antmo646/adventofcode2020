const fs = require('fs')

var valArr = []
fs.readFile('./day7/input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    valArr = data.split(/\r\n/).map(function(row) {

        return {
            name: row.split(' contain')[0],
            contain: row.includes('no other') ? [] : row.split('contain ')[1].split(', ')          
        }
        })
    answer = 0;
    answer = calculateNumberOfBags(valArr.filter(obj => obj.name == "shiny gold bags")[0])-1
    console.log(answer)
})

function calculateNumberOfBags(bag) {
    var num = 1
    bag.contain.forEach(innerBag => {
        var innerbagObj = valArr.filter(obj => obj.name == innerBag.substring(innerBag.indexOf(' ')+1).split('bag')[0].concat('bags'))[0]
        num = num + parseInt(innerBag[0]) * calculateNumberOfBags(innerbagObj)
    })
    return num
}