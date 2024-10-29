const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberOfExamples = null; //Promenna na pocet prikladu, ktere vyplni uzivatel, tahle promenna se pouziva u hodne funkci
let numberOfTerms = null; // Promenna na pocet clenu, tohle take vyplni uzivatel
let resultsArray = []; // Pole do ktereho se ukladaji spravne vysledky prikladu, ktere spocita pocitac
let userAnswers = []; // Pole do ktereho se uklada odpovedi, ktere vyplni uzivatel

const { generateRandomNumber, generateRandomOperator } = require('./randomGenerators'); // zavola funkce ze souboru randomGenerate
const { askForNumberOfExamples, askForNumberOfTerms, askForResult } = require('./userInput'); // zavola funkce ze souboru userInput
const { compareArrays } = require('./comparison'); //
const { createExamples } = require('./exampleGenerator'); //

// spusti se funce
askForNumberOfExamples(rl, (input) => {
numberOfExamples = input;
askForNumberOfTerms(rl, (input) => {
numberOfTerms = input;
createExamples(rl, numberOfExamples, numberOfTerms, (resultsArray, userAnswers) => {
compareArrays(resultsArray, userAnswers, numberOfExamples);
});
});
});