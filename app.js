const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { askForNumberOfExamples, askForNumberOfTerms } = require('./userInput'); // zavola funkce ze souboru userInput
const { compareArrays } = require('./comparison'); //
const { createExamples } = require('./exampleGenerator'); //

// spusti se funce
askForNumberOfExamples(rl, numberOfExamples => {
askForNumberOfTerms(rl, numberOfTerms => {
createExamples(rl, numberOfExamples, numberOfTerms, (resultsArray, userAnswers) => {
compareArrays(resultsArray, userAnswers, numberOfExamples);
});
});
});