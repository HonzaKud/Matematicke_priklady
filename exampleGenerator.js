// importy funci z jinych souboru
const { askForResult } = require('./userInput'); // Import funkce askForResult ze souboru userInput.js 
const { generateRandomNumber, generateRandomOperator } = require('./randomGenerators'); // Import funkci generateRandomNumber a generateRandomOperator ze souboru randomGenerators.js

//funkce pro vytvareni prikladu
function createExamples(rl, numberOfExamples, numberOfTerms, callback)  {
    let resultsArray = []; // Pole pro spravne vysledky

    for (let i = 0; i < numberOfExamples; i++) { //cyklus kterej probehne tolikrat, kolik je prikladu
        console.log(`Příklad číslo ${i + 1}:`); // vypise kolikaty je to priklad
        let exampleExpression = ""; // promenna pro ukladani vyrazu pro kazdy priklad

        for (let j = 0; j < numberOfTerms; j++) { //cyklus kterej probehne tolikrat, kolik je clenu
            const random = generateRandomNumber(); // zavola funkci gerateRandomNumber a ulozi do promenne random
            process.stdout.write(`${random} `); // vypise nahodne cislo a zustane na stejnem radku
            exampleExpression += `${random}`; // ulozi cislo do promenne exampleExpression
       
            if (j+1 < numberOfTerms) { //zjistuje, jestli muze napsat znak (hodnota je zvetsena o 1, protoze znaku musi byt o 1 mene nez cisel)
                const operator = generateRandomOperator(); // zavola funkci generateRandomOperator a ulozi do promenne operator
                process.stdout.write(`${operator} `); // vypise nahodny znak a zustane na stejnem radku
                exampleExpression += `${operator}`; // ulozi znak do promenne exampleExpression
            } else {
                process.stdout.write(`= `);  //pokud jsme na konci prikladu, tak misto znaku vypise rovna se
            }
        }

        let result = eval(exampleExpression); //vypocita ulozeny priklad exampleExpression a ulozi do promenne result
        //console.log(result); //kotrola, jaka hodnota je vysledek
        resultsArray.push(result); // hodnota promenne result se pushne do pole resultsArray
        exampleExpression = ''; //vyprazni promennou exampleArray, aby se do ni mohl zapsat dalsi priklad
        console.log(); // prida se novy radek
    }
    //console.log(resultsArray); //kontrola pole resultsArray, to se vypise
    askForResult(rl, numberOfExamples, resultsArray, callback); // zavola funkci pro zeptani se uzivatele na vysledek
  }

  module.exports = { createExamples }; // exportovani funkce pro dalsi vyuziti