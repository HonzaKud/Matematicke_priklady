const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberOfExamples = null; //Promenna na pocet prikladu, ktere vyplni uzivatel
let numberOfTerms = null; // Promenna na pocet clenu, tohle take vyplni uzivatel
let exampleExpression = ""; // Do teto promenne se uklada postupne cely priklad, ktery se pak nasledne vypocita pomoci funce eval a ulozi do promenne result
let result; // Do teto promenne se ulozi vysledek pocitacem spocitaneho prikladu, tato promenna se pak ulozi do pole resultsArray
let exampleIndex = 0; //Promenna, ktera slouzi k vypisovani poctu prikladu, az se promenna rovna numberOfExamples, pak dojde k porovnani pole vysledku s polem vysledku uzivatele
let resultsArray = []; // Pole do ktereho se ukladaji spravne vysledky prikladu, ktere spocita pocitac
let userAnswers = []; // Pole do ktereho se uklada odpovedi, ktere vyplni uzivatel
let correctAnswersCount = 0; //Promenna postupne uklada pocet spravnych odpovedi, tzn. pokud se hodnota pole resultsArray a userAnswers shoduji, pak je +1

const { generateRandomNumber, generateRandomOperator } = require('./randomGenerators'); // zavola funkce ze souboru randomGenerate
const { askForNumberOfExamples } = require('./userInput'); // zavola funkce ze souboru userInput

// Funkce pro dotazovani uzivatele na vysledek
function askForResult() {
  rl.question(`Napis vysledek prikladu cislo ${exampleIndex + 1} :`, (userAnswerInput) => { //dotaz na vysledky prikladu a cekani na odpoved
    console.log('Děkuji');
    userAnswers.push(userAnswerInput);  // Pridani odpovedi do pole 
    exampleIndex++; // Zvetseni promenne exampleIndex o 1 pro dalsi priklad
    
    if (exampleIndex < numberOfExamples) { // Overeni, zda jsou projity vsechny priklady
      askForResult(); // Zavolani funkci znovu pro dalsi priklad
    }
    else
    {
    //console.log('Všechny odpovědi: ', userAnswers); // overeni jestli jsou v promenne userAnswers spravna data
    rl.close(); //zavreni readline
    compareArrays (resultsArray, userAnswers); //zavola funci pro porovnani dvou poli
    }
  })
};

//Funkce pro porovnani dvou poli
function compareArrays (resultsArray, userAnswers) { 
  for (let i = 0; i < resultsArray.length; i++) { // cyklus pro prochazeni jednotlivych hodnotach v polich
   if (resultsArray[i] == userAnswers[i]) { // pokud se pole shoduji
      correctAnswersCount++; // Zvysi se pocet o 1, dokud se hodnoty nebudou shodovat
    }
  }

  console.log(`Pocet spravnych odpovedi je: ${correctAnswersCount} / ${numberOfExamples}`); // vypsani poctu spravnych odpovedi a poctu celkovych odpovedi
}

//funkce pro vytvareni prikladu
function createExamples ()  {

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
askForResult(); // zavola funkci pro zeptani se uzivatele na vysledek
}

// Funkce pro dotazovani uzivatele na pocet clenu v prikladech
function askForNumberOfTerms() {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (userTermsCountInput) => { //dotaz na pocet clenu a cekani na odpoved
      // zkontroluj, zda je odpoved spravna
      if (userTermsCountInput >= 1 && userTermsCountInput <= 9) {
        console.log(`Děkuji, pocet clenu bude: ${userTermsCountInput}`); //vypsani odpovedi
        numberOfTerms = userTermsCountInput; //ulozeni odpovedi do globalni promenne numberOfTerms
         // Generace poctu prikladu
             createExamples() // zavola funkci na vytvoreni prikladu
      } else {
        console.log('Neplatný vstup. Zkus to znovu.'); // pokud na vstupu uzivatel napise kravinu
        askForNumberOfTerms(); // znovu se zeptame uzivatele na pocet clenu
      }
    });
  }

// spusti se funce
askForNumberOfExamples(rl, (input) => {
numberOfExamples = input;
askForNumberOfTerms();
});