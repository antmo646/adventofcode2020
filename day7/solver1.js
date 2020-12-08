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
    valArr.forEach(bag => {
        if (calculateNumberOfBags(bag) > 0) answer++
        console.log(answer)
    })
    console.log(answer)
})

function calculateNumberOfBags(bag) {
    var num = 0
    bag.contain.forEach(innerBag => {
        var test = innerBag.substring(innerBag.indexOf(' ')+1) //.split('bag')[0].concat('bags')
        var innerbagObj = valArr.filter(obj => obj.name == innerBag.substring(innerBag.indexOf(' ')+1).split('bag')[0].concat('bags'))[0]
        if (innerbagObj.name == "shiny gold bags") num = parseInt(innerBag[0])
        num = num + parseInt(innerBag[0]) * calculateNumberOfBags(innerbagObj)
    })
    return num
}