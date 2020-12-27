const fs = require('fs');
const { cursorTo } = require('readline');

class Node {
    next = null
    value = null
    constructor(value) {
        this.value = value
    }
}

class LinkedList {
    size = 0
    head = null
    tail = null
    map = new Map()
    append = (value) => {
        const node = new Node(value)
        this.map.set(value, node)
        this.size++
        if (!this.head) {
            this.head = node
            this.tail = node
            this.tail.next = node
            return
        }
        this.tail.next = node
        this.tail = node
        this.tail.next = this.head
    }
    size = () => {
        return size
    }
    find = (value, start) => {
        return this.map.get(value)
        console.time("time")
        let current = start
        if (current == null || current.value === value) return current
        current = current.next
        while (current != null && current.value !== value) {
            current = current.next
            if (current == start) return
        }
        console.timeEnd("time")
        return current
    }
    insert = (afterValue, values, start) => {
        let current = this.find(afterValue, start)

        let tailUpdate = false
        if (this.tail = current) {
            tailUpdate = true
        }
        if (current == null) return
        let last = current.next
        values.forEach(element => {
            let newNode = new Node(element)
            current.next = newNode
            current = newNode
            this.map.set(newNode.value, newNode)
        });
        current.next = last
        if (tailUpdate) this.tail = current
        return
    }
    removeThree = (afterValue, start) => {
        let current = this.find(afterValue, start)
        let returnArr = [
            current.next.value,
            current.next.next.value,
            current.next.next.next.value
        ]
        if (returnArr.includes(this.head.value)) {
            this.head = current.next.next.next.next
            this.tail = current
        } else if (current.next.next.next.next == this.head) this.tail = current
        current.next = current.next.next.next.next
        return returnArr
    }
    log = () => {
        let returnArr = []
        let current = this.head
        while(true) {
            returnArr.push(current.value)
            current = current.next
            if (current == this.head) return returnArr
        }
    }
}

let data = fs.readFileSync('./day23/input.txt', 'UTF-8').split("").map(Number)
let list = new LinkedList()
let i = 0
data.forEach(el => {
    list.append(el)
})
for (let i = Math.max(...data)+1; i <= 1000000; i++) {
    list.append(i)
}

let prev5 = []

let cc = list.head
prev5.push(cc)
for (let i = 0; i < 10000000; i++) {
    if (i % 100000 == 0) console.log(i)
    //let index = data.indexOf(cc)
    let dc  = cc.value - 1
    cc = cc.next.next.next.next
    prev5.push(cc)
    if (prev5.length > 5) {
        prev5.shift()
    }
    let pu = list.removeThree(dc+1, prev5[0])//data.splice((index + 1) % data.length, 3 % data.length)
    let finder = prev5[0]
    while(pu.includes(dc)) dc--
    if (dc === 0) {
        dc = 1000000
        finder = list.last
        while(pu.includes(dc)) dc--
    }
    list.insert(dc, pu, finder)
    //data.splice(data.indexOf(dc)+1, 0, ...pu)
}
let one = list.find(1, list.head)
let answer = [one.next.value, one.next.next.value]
console.log(answer)
console.log(answer.reduce((t,c) => t*c))

