const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'UTF-8')
data1 = data.split(/\r\n/)
cons = data1.slice(0, data1.indexOf('')).map(row => {
    row = row.split(': ')[1]
    return [row.split('-')[0], row.split('-')[1].split(' or')[0], row.split('or ')[1].split('-')[0], row.split('or ')[1].split('-')[1]]
})
tickets = data.split('nearby tickets:')[1].replace(/\r\n/g, ',').split(',')
tickets.shift()
tickets = tickets.map(Number)
console.log(cons)
console.log(tickets)

cons.forEach(row => {
    row = row.map(Number)
    for (var i = row[0]; i <= row[3]; i++) {
        tickets = tickets.filter(t => t != i)
        if (i == row[1]) i = row[2]
    }
});
console.log(tickets.reduce((t,c) => t+c))

myArr = [[1], [1]]
console.log(myArr.some(x => x.length == 0))
