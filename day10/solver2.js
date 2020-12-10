const fs = require('fs')
var seen = {}
fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split(/\r\n/).map(Number)
    valArr.push(0)
    valArr.sort((a,b) => a-b)
    seen[valArr[valArr.length-1]] = 1
console.time('someFunction')
    var hej = 1*10023100*123123*12301230
    //console.log(adapterWays(valArr))
console.timeEnd('someFunction')

})



function adapterWays(range) {
    if (range in seen)  return seen[range]
    total = 0
    var index = 1
    while (range[index] - range[0] < 4) {
        total += adapterWays(range.slice(index))
        index++
    }
    seen[range] = total
    return total
}