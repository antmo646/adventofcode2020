const fs = require('fs');

let data = fs.readFileSync('./day21/input.txt', 'UTF-8').replace(/\n/g, "").split(')')
data.pop()
allIngredients = []
allAllergens = new Set()
data = data.map(element => {
    let ing = element.split('(')[0].trim().split(' ')
    let alg = element.split('(contains')[1].trim().split(', ')
    ing.forEach(item => allIngredients.push(item))
    alg.forEach(item => allAllergens.add(item))
    return {
        ingredients: ing,
        allergens: alg
    }
})

reducedPairs = []
allAllergens.forEach(alg => {
    let filteredData = data.filter(x => x.allergens.includes(alg))
    suspects = filteredData[0].ingredients
    filteredData.forEach(row => {
        suspects = suspects.filter(x => row.ingredients.includes(x))
    })
    reducedPairs.push({
        allergen: alg,
        ingredient: suspects
    })
})
for (let i = 0; i < 10; i++) {
    reducedPairs.forEach(item => {
        if (item.ingredient.length == 1) {
            for (let index = 0; index < reducedPairs.length; index++) {
                if (reducedPairs[index].ingredient.length > 1 &&
                    reducedPairs[index].ingredient.includes(item.ingredient[0])) {
                    reducedPairs[index].ingredient =
                        reducedPairs[index].ingredient.filter(x => x != item.ingredient[0])
                }
            }
        }
    })
}

wantedIngs = allIngredients.filter(x => !reducedPairs.map(item => item.ingredient[0]).includes(x))
console.log(wantedIngs.length)