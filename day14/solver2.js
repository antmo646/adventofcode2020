const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'UTF-8').split(/\r\n/)
let mem = {}
let bitmask = ''

data.forEach(row => {
    if (row[1] == 'a') {
        bitmask = row.split(' ')[2]
    } else if (row[1] == 'e') {
        let initMem = parseInt(row.slice(4).split(/]/)[0]).toString(2)
        let memAddreses = [new Array(36 - initMem.length + 1).join('0').concat(initMem)]
        for (var i = 0; i < bitmask.length; i++) {
            if (bitmask[i] == 'X') {
                temp = []
                memAddreses.forEach(addr => {
                    temp.push(addr.substr(0, i) + '0' + addr.substr(i+1), addr.substr(0, i) + '1' + addr.substr(i+1))
                });
                memAddreses = temp.slice()
            } else if (bitmask[i] == '1') {
                memAddreses.forEach((addr,j) => {
                   memAddreses[j] = addr.substr(0, i) + '1' + addr.substr(i+1)
                });
            }
        }
        memAddreses.forEach(addr => {
            mem[parseInt(addr,2)] = parseInt(row.split(' ')[2])
        })
    }
})
var answer = 0
Object.values(mem).forEach(val => answer += val)
console.log(answer)
