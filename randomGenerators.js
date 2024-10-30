//funkce pro generovani nahodneho cisla mezi cisli 1 az 9 (omezeni je pouze tady, jinak by mel program umet pracovat s vetsim rozpetim)
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random()*9)+1; //generator nahodnych cisel mezi 1 az 9
  return randomNumber; // funkce vraci randomNumber
}
  
 //funkce pro generovani nahodneho znaku (operatoru) +, -, *
function generateRandomOperator() {
  const mathOperators = ['+', '-', '*']; // Toto pole obsahuje znamenka, ze kterych se nahodne vybira to, ktere bude dale pouzivane
  const index = Math.floor(Math.random() * mathOperators.length); // Nahodne vybere index v poli
  return mathOperators[index]; // Funkce vraci promenou mathOperators
}

module.exports = { generateRandomNumber, generateRandomOperator }; // exportovani funkce pro dalsi vyuziti