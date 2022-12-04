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

var canBeAllergen = allergens.map(i => {
  var foodsWithAllergen = foods.filter(f => f.allergens.indexOf(i)>=0).map(f => f.ingredients);
  var ingredientsInFoodsWithAllergen = foodsWithAllergen.reduce((acc, cur) => acc.concat(cur), []);
  var a = Object.entries( ingredientsInFoodsWithAllergen.reduce((acc, cur) => { acc[cur] = acc[cur] || 0; acc[cur]++; return acc; }, {}) ).filter(e => e[1] == foodsWithAllergen.length);
  return a;
}).map(a => a.map(b => b[0])).reduce((acc, cur) => acc.concat(cur), []);

var cantBeAllergen = ingredients.filter(i => canBeAllergen.indexOf(i) < 0).reduce((acc, cur) => { if(acc.indexOf(cur) >= 0) { return acc;} else { acc.push(cur); return acc; } }, []);
var total = foods.map(f => f.ingredients).reduce((acc, cur) => acc.concat(cur), []).map(i => cantBeAllergen.indexOf(i)).filter(idx => idx>=0).length;
log(total);
