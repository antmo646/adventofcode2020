const fs = require('fs');

let data = fs.readFileSync('./day23/input.txt', 'UTF-8').split("").map(Number)
let i = 0
let cc = data[0]
for (let i = 0; i < 100; i++) {
    let index = data.indexOf(cc)
    let logData = data.slice()
    logData[index % data.length] = "(" + logData[index % data.length] + ")"
    console.log("-- move " + (i+1) + "--")
    console.log("cups ", logData)
    let dataCopy = data.slice()
    let pu = data.splice((index + 1) % data.length, 3 % data.length)
    pu.push(...data.splice(0, 3-pu.length))
    let dc  = dataCopy[index % dataCopy.length] - 1
    while(pu.includes(dc)) dc--
    if (dataCopy.every(x => dc < x)) dc = Math.max(...data)

    console.log("pick up ", pu)
    console.log("destination ", dc)
    console.log("")
    
    cc = dataCopy[(index+4) % dataCopy.length]
    data.splice(data.indexOf(dc)+1, 0, ...pu)

}
let answer = []
console.log(data)
for (let index = 1; index < data.length; index++) {
    answer.push(data[(data.indexOf(1)+index)%data.length])
}
console.log(answer.join().replace(/,/g, ""))

