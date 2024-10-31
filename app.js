// Import modulu
const readline = require('readline'); // Import modulu readline
const { askForNumberOfExamples } = require('./userInput'); // Import funkci askForNumberOfExamples ze souboru userInput.js
const { compareArrays } = require('./comparison'); // Import funkce compareArrays ze souboru comparison.js
const { createExamples } = require('./exampleGenerator'); // Import funkce createExamples ze souboru exampleGenerator.js

// Vytvoreni rozhrani pro cteni vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Spousti se funkce
askForNumberOfExamples(rl, (numberOfExamples, numberOfTerms) => {// zacatek programu, ptame se uzivatele na na vstupy
  createExamples(rl, numberOfExamples, numberOfTerms, (resultsArray, userAnswers) => {//funkce pro vytvareni prikladu
    compareArrays(resultsArray, userAnswers, numberOfExamples);// funkce pro porovnani poli vysledku uzivatele a programu
  });
});