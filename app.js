const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberOfExamples = null;
let numberOfTerms = null;
let random = null;
let operator = null;
let exampleExpression = "";
let result;
let exampleIndex = 0;
let resultsArray = [];
let userAnswers = [];
let correctAnswersCount = 0;

//funkce pro generovani nahodneho cisla mezi cisli 1 az 9
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random()*9)+1; //generator nahodnych cisel mezi 1 az 9
  random = randomNumber;
}

//funkce pro generovani nahodneho znaku (operatoru) +, - *
function generateRandomOperator() {
  const mathOperators = ['+', '-', '*']; // Pole obsahující matematická znaménka
  const index = Math.floor(Math.random() * mathOperators.length); // Náhodně vybere index v poli
  operator = mathOperators[index];
}

// Funkce pro dotazování uživatele na pocet prikladu
function askForNumberOfExamples() {
  rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (userExampleCountInput) => {
    // Zkontroluj, zda je odpověď platná
    if (userExampleCountInput >= 1 && userExampleCountInput <= 9) {
      console.log(`Děkuji, pocet prikladu bude: ${userExampleCountInput}`);
      numberOfExamples = userExampleCountInput;
      askForNumberOfTerms(); // Zavřít rozhraní, pokud je vstup platný
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
      askForNumberOfExamples(); // Znovu se ptát uživatele
    }
  });
}

// Funkce pro dotazování uživatele na výsledek
function askForResult() {
  rl.question(`Napis vysledek prikladu cislo ${exampleIndex + 1} :`, (userAnswerInput) => {
    console.log('Děkuji');
    userAnswers.push(userAnswerInput);  // Přidáme odpověď do pole 
    exampleIndex++; // Zvětšíme k o 1 pro další příklad
    
    if (exampleIndex < numberOfExamples) { // Ověření, zda jsme ještě neprošli všechny příklady
      askForResult(); // Zavoláme funkci znovu pro další příklad
    }
    else
    {
    //console.log('Všechny odpovědi: ', userAnswers);
    rl.close();
    compareArrays (resultsArray, userAnswers); 
    }
  })
};

//Funkce pro porovnani dvou poli
function compareArrays (resultsArray, userAnswers) {
  for (let i = 0; i < resultsArray.length; i++) {
    if (resultsArray[i] == userAnswers[i]) {
      correctAnswersCount++; // Zvyšte počet, pokud se hodnoty neshodují
    }
  }
  console.log(`Pocet spravnych odpovedi je: ${correctAnswersCount} / ${numberOfExamples}`);
}

//funkce pro vytvareni prikladu
function createExamples ()  {
  for (let i = 0; i < numberOfExamples; i++) {
    generateRandomNumber();
   console.log(`Příklad číslo ${i + 1}:`);
   for (let j = 0; j < numberOfTerms; j++) {
    generateRandomNumber()
      generateRandomOperator()
      process.stdout.write(`${random} `); // Použijeme stdout pro vypisování na stejný řádek
      exampleExpression += `${random}`;
     if (j+1 < numberOfTerms) {
      process.stdout.write(`${operator} `); // Použijeme stdout pro vypisování na stejný řádek
      exampleExpression += `${operator}`;
    } else {
      process.stdout.write(`= `);  
    }
  }
  result = eval(exampleExpression);
      //console.log(result);
      resultsArray.push(result);
      exampleExpression = '';
  console.log(); // Přidáme nový řádek na konec
  }
//console.log(resultsArray);
askForResult();
}

// Funkce pro dotazování uživatele na pocet clenu v prikladech
function askForNumberOfTerms() {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (userTermsCountInput) => {
      // Zkontroluj, zda je odpověď platná
      if (userTermsCountInput >= 1 && userTermsCountInput <= 9) {
        console.log(`Děkuji, pocet clenu bude: ${userTermsCountInput}`);
        numberOfTerms = userTermsCountInput;
         // Generace poctu prikladu
             createExamples()
      } else {
        console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
        askForNumberOfTerms(); // Znovu se ptát uživatele
      }
    });
  }

// Spusť funkci
askForNumberOfExamples();