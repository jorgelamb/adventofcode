var foodDescriptions = input.split("\n");

var foods = [];

foodDescriptions.forEach(f => {
  var details = f.split(" (contains ");
  var ingredients = details[0].split(" ");
  var allergens = [];
  try { allergens = details[1].substring(0, details[1].length-1).split(", "); } catch(e) {}
  foods.push({ ingredients: ingredients, allergens: allergens });
});

var ingredients = Object.keys( Object.entries(foods).map(e => e[1]).map(f => f.ingredients).reduce((a, b) => a.concat(b), []).reduce((acc, cur) => { acc[cur] = cur; return acc; }, {}) );
var allergens = Object.keys( Object.entries(foods).map(e => e[1]).map(f => f.allergens).reduce((a, b) => a.concat(b), []).reduce((acc, cur) => { acc[cur] = cur; return acc; }, {}) );

var noAllergenIngredients = [];
var allergenMap = {};

var canBeAllergen = allergens.map(i => {
  var foodsWithAllergen = foods.filter(f => f.allergens.indexOf(i)>=0).map(f => f.ingredients);
  var ingredientsInFoodsWithAllergen = foodsWithAllergen.reduce((acc, cur) => acc.concat(cur), []);
  var a = Object.entries( ingredientsInFoodsWithAllergen.reduce((acc, cur) => { acc[cur] = acc[cur] || 0; acc[cur]++; return acc; }, {}) ).filter(e => e[1] == foodsWithAllergen.length);

  allergenMap[i] = { list: a.map(e => e[0]) };
  return a;
}).map(a => a.map(b => b[0])).reduce((acc, cur) => acc.concat(cur), []);

var cantBeAllergen = ingredients.filter(i => canBeAllergen.indexOf(i) < 0).reduce((acc, cur) => { if(acc.indexOf(cur) >= 0) { return acc;} else { acc.push(cur); return acc; } }, []);

var updated = true;
while(updated) {
  updated = false;
  Object.keys(allergenMap).forEach(k => {
    if(!allergenMap[k].mapped) {
      if(allergenMap[k].list.length == 1) {
        allergenMap[k].mapped = allergenMap[k].list[0];
        allergenMap[k].list = null;
        updated = true;
        Object.keys(allergenMap).forEach(k2 => {
          if(!allergenMap[k2].mapped) {
            allergenMap[k2].list = allergenMap[k2].list.filter(a => a != allergenMap[k].mapped);
          }
        });
      }
    }
  });
}

var result = Object.entries(allergenMap).sort((a, b) => a[0]>b[0] ? 1 : -1).map(a => a[1]).map(a => a.mapped).join(",");
log("result: "+result);
