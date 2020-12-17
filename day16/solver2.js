const fs = require('fs')

let data = fs.readFileSync('./day16/input.txt', 'UTF-8')
data1 = data.split(/\r\n/)
cons = data1.slice(0, data1.indexOf('')).map(row => {
    row = row.split(': ')[1]
    return [parseInt(row.split('-')[0]), parseInt(row.split('-')[1].split(' or')[0]), parseInt(row.split('or ')[1].split('-')[0]), parseInt(row.split('or ')[1].split('-')[1])]
})
tickets = data.split('nearby tickets:')[1].replace(/\r\n/g, ',').split(',')
tickets.shift()
tickets = tickets.map(Number)

cons.forEach(row => {
    row = row.map(Number)
    for (var i = row[0]; i <= row[3]; i++) {
        tickets = tickets.filter(t => t != i)
        if (i == row[1]) i = row[2]
    }
});



orgTicketsOld = data.split('nearby tickets:')[1].trim()
orgTicketsOld = orgTicketsOld.split(/\r\n/).map(row => row.split(',').map(Number))
let orgTickets = []
orgTicketsOld.forEach(row => {
    var included = false;
    tickets.forEach(trow => {
        if (row.includes(trow)) included = true
    })
    if (!included) orgTickets.push(row)
})

cons.map(row => row.map(Number))

var matches = []

for (var i = 0; i < orgTickets[0].length; i++) {
    var temp = []
    for (var k = 0; k < cons.length; k++) {
        var foundOne = true
        for (var j = 0; j < orgTickets.length; j++) {
            if (!inInterval(orgTickets[j][i], cons[k])) {
                foundOne = false
                break;
            }
        }
        if (foundOne) {
            temp.push(k)
        }
    }
    matches.push(temp)

}

for (let k = 0; k < 20; k++) {
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].length == 1)
            for (let j = 0; j < matches.length; j++) {
                if (matches[j].includes(matches[i][0]) && j != i) {
                    matches[j] = matches[j].filter(num => num != matches[i])
                }
            }
    }
}

const myTicket = data.split('your ticket:')[1].trim().split(/\r\n/)[0].split(',').map(Number)
matches = matches.map(m => m.pop())
let answer = 1
for (let i = 0; i < 6; i++){
    
    answer *= myTicket[matches.indexOf(i)]
}
console.log(answer)


function inInterval(ticketNum, interval) {
    for (var index = interval[0]; index <= interval[3]; index++) {
        if (index === ticketNum) return true
        if (index == interval[1]) index = interval[2] - 1
    }
    return false
}