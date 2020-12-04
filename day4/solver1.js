const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split(/\n\s*\n/).map(function(row) {

        return row
        })

    requiredFields = [
        ' ecl', 
        ' pid',
        ' eyr',
        ' hcl',
        ' byr',
        ' iyr',
        ' hgt',

    ]
    invalidPass = false;
    numInvalid = 0;
    valArr.forEach(row => {
        row = ' '.concat(row)
        row = row.replace(/[\r\n]+/g," ");
    console.log(row)
        requiredFields.forEach(element => {
            if (!row.includes(element)) {
                invalidPass = true;
            } 
        });
        if (invalidPass) {
            numInvalid++
        }
        invalidPass = false;
    })

    console.log(valArr.length - numInvalid)
})