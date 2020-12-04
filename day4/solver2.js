const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', function(err, data) {
    if (err) return console.log(err)
    var valArr = data.split(/\n\s*\n/).map(function(row) {

        return row
        })

    requiredFields = [
        {'byr:': /^19[2-9][0-9]|200[0-2]$/},
        {'iyr:': /^201[0-9]|2020$/},
        {'eyr:': /^202[0-9]|2030$/},
        {'hgt:': /^(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)$/},
        {'hcl:': /^#([\da-f]{6})$/},
        {'ecl:': /^amb|blu|brn|gry|grn|hzl|oth$/},
        {'pid:': /^\d{9}$/},
    ]
    
    
    invalidPass = false;
    numInvalid = 0;
    valArr.forEach(row => {
        row = row.replace(/\r/g, ' ')
        requiredFields.forEach(element => {
            var key = Object.keys(element)[0];
            var value = element[key]
            if (!row.includes(key)) {
                invalidPass = true;
            } 
            else {
                if (!row.split(key)[1].split(' ')[0].match(value)) {invalidPass = true} 
            }
        });
        if (invalidPass) {
            numInvalid++
        }
        invalidPass = false;
    })

    console.log(valArr.length - numInvalid)

})