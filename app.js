const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberOfExamples = null; //Promenna na pocet prikladu, ktere vyplni uzivatel
let numberOfTerms = null; // Promenna na pocet clenu, tohle take vyplni uzivatel
let random = null; // Do teto promenne se uklada nahodne vygenerovane cislo, ktere se pak vklada do prikladu
let operator = null; // Do teto promenne se uklada nahodne vygenerovany znak (+,-,*), ktere se pak vklada do prikladu
let exampleExpression = ""; // Do teto promenne se uklada postupne cely priklad, ktery se pak nasledne vypocita pomoci funce eval a ulozi do promenne result
let result; // Do teto promenne se ulozi vysledek pocitacem spocitaneho prikladu, tato promenna se pak ulozi do pole resultsArray
let exampleIndex = 0; //Promenna, ktera slouzi k vypisovani poctu prikladu, az se promenna rovna numberOfExamples, pak dojde k porovnani pole vysledku s polem vysledku uzivatele
let resultsArray = []; // Pole do ktereho se ukladaji spravne vysledky prikladu, ktere spocita pocitac
let userAnswers = []; // Pole do ktereho se uklada odpovedi, ktere vyplni uzivatel
let correctAnswersCount = 0; //Promenna postupne uklada pocet spravnych odpovedi, tzn. pokud se hodnota pole resultsArray a userAnswers shoduji, pak je +1

//funkce pro generovani nahodneho cisla mezi cisli 1 az 9 (omezeni je pouze tady, jinak by mel program umet pracovat s vetsim rozpetim)
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random()*9)+1; //generator nahodnych cisel mezi 1 az 9
  random = randomNumber; // vygenerovane nahodne cislo se ulozi do globalni promenne random
}

//funkce pro generovani nahodneho znaku (operatoru) +, -, *
function generateRandomOperator() {
  const mathOperators = ['+', '-', '*']; // Toto pole obsahuje znamenka, ze kterych se nahodne vybira to, ktere bude dale pouzivane
  const index = Math.floor(Math.random() * mathOperators.length); // Nahodne vybere index v poli
  operator = mathOperators[index]; // Ulozi nahodne vygenerovane znamenko do globalni promenne operator
}

// Funkce pro dotazovani uzivatele na pocet prikladu
function askForNumberOfExamples() {
  rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (userExampleCountInput) => { //dotaz na pocet prikladu a cekani na odpoved
    // Kontrola spravnosti odpovedi
    if (userExampleCountInput >= 1 && userExampleCountInput <= 9) {
      console.log(`Děkuji, pocet prikladu bude: ${userExampleCountInput}`); // vypsani odpovedi
      numberOfExamples = userExampleCountInput; //prepsani promenne do globalni promenne numberOfExamples
      askForNumberOfTerms(); // Zavre rozhrani, pokud je vstup platny
    } else {
      console.log('Neplatny vstup. Zkus to znovu.'); // Zprava o neplatnem vstupu
      askForNumberOfExamples(); // Znovu se ptat uzivatele
    }
  });
}

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
    generateRandomNumber() //zapne funkci pro generovani nahodnych cisel
      generateRandomOperator() //zapne funkci pro generovani nahodnych znaku
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
askForNumberOfExamples();