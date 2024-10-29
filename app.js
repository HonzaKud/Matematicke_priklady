const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberOfExamples = null; //Promenna na pocet prikladu, ktere vyplni uzivatel, tahle promenna se pouziva u hodne funkci
let numberOfTerms = null; // Promenna na pocet clenu, tohle take vyplni uzivatel
let exampleExpression = ""; // Do teto promenne se uklada postupne cely priklad, ktery se pak nasledne vypocita pomoci funce eval a ulozi do promenne result
let result; // Do teto promenne se ulozi vysledek pocitacem spocitaneho prikladu, tato promenna se pak ulozi do pole resultsArray
let resultsArray = []; // Pole do ktereho se ukladaji spravne vysledky prikladu, ktere spocita pocitac
let userAnswers = []; // Pole do ktereho se uklada odpovedi, ktere vyplni uzivatel

const { generateRandomNumber, generateRandomOperator } = require('./randomGenerators'); // zavola funkce ze souboru randomGenerate
const { askForNumberOfExamples, askForNumberOfTerms, askForResult } = require('./userInput'); // zavola funkce ze souboru userInput
const { compareArrays } = require('./comparison'); //

//funkce pro vytvareni prikladu
function createExamples(callback)  {

  for (let i = 0; i < numberOfExamples; i++) { //cyklus kterej probehne tolikrat, kolik je prikladu
   console.log(`Příklad číslo ${i + 1}:`); // vypise kolikaty je to priklad
   for (let j = 0; j < numberOfTerms; j++) { //cyklus kterej probehne tolikrat, kolik je clenu
    const random = generateRandomNumber(); // zavola funkci gerateRandomNumber a ulozi do promenne random
    const operator = generateRandomOperator(); // zavola funkci generateRandomOperator a ulozi do promenne operator
      process.stdout.write(`${random} `); // vypise nahodne cislo a zustane na stejnem radku
      exampleExpression += `${random}`; // ulozi cislo do promenne exampleExpression
     if (j+1 < numberOfTerms) { //zjistuje, jestli muze napsat znak (hodnota je zvetsena o 1, protoze znaku musi byt o 1 mene nez cisel)
      process.stdout.write(`${operator} `); // vypise nahodny znak a zustane na stejnem radku
      exampleExpression += `${operator}`; // ulozi znak do promenne exampleExpression
    } else {
      process.stdout.write(`= `);  //pokud jsme na konci prikladu, tak misto znaku vypise rovna se
    }
  }
  result = eval(exampleExpression); //vypocita ulozeny priklad exampleExpression a ulozi do promenne result
      //console.log(result); //kotrola, jaka hodnota je vysledek
      resultsArray.push(result); // hodnota promenne result se pushne do pole resultsArray
      exampleExpression = ''; //vyprazni promennou exampleArray, aby se do ni mohl zapsat dalsi priklad
  console.log(); // Prida se novy radek
  }
//console.log(resultsArray); //kontrola pro pole, to se vypise
askForResult(rl, compareArrays, 0, numberOfExamples, userAnswers, resultsArray, callback); // zavola funkci pro zeptani se uzivatele na vysledek
}

// spusti se funce
askForNumberOfExamples(rl, (input) => {
numberOfExamples = input;
askForNumberOfTerms(rl, (input) => {
numberOfTerms = input;
createExamples((resultsArray, userAnswers) => {
compareArrays(resultsArray, userAnswers, numberOfExamples);
});
});
});