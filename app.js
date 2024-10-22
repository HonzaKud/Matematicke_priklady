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
let priklad = "";
let result;
let k = 0;
let polevysledky = [];
let poleodpovedi = [];
let correctAnswersCount = 0;

//funkce pro generovani nahodneho cisla mezi cisli 1 az 9
function generateRandomNumber() {
  const nahodne = Math.floor(Math.random()*9)+1; //generator nahodnych cisel mezi 1 az 9
  random = nahodne;
}

//funkce pro generovani nahodneho znaku (operatoru) +, - *
function generateRandomOperator() {
  const znamenka = ['+', '-', '*']; // Pole obsahující matematická znaménka
  const index = Math.floor(Math.random() * znamenka.length); // Náhodně vybere index v poli
  operator = znamenka[index];
}

// Funkce pro dotazování uživatele na pocet prikladu
function askForNumberOfExamples() {
  rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (odpovedPP) => {
    // Zkontroluj, zda je odpověď platná
    if (odpovedPP >= 1 && odpovedPP <= 9) {
      console.log(`Děkuji, pocet prikladu bude: ${odpovedPP}`);
      numberOfExamples = odpovedPP;
      askForNumberOfTerms(); // Zavřít rozhraní, pokud je vstup platný
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
      askForNumberOfExamples(); // Znovu se ptát uživatele
    }
  });
}

// Funkce pro dotazování uživatele na výsledek
function askForResult() {
  rl.question(`Napis vysledek prikladu cislo ${k + 1} :`, (odpovedVy) => {
    console.log('Děkuji');
    poleodpovedi.push(odpovedVy);  // Přidáme odpověď do pole 
    k++; // Zvětšíme k o 1 pro další příklad
    
    if (k < numberOfExamples) { // Ověření, zda jsme ještě neprošli všechny příklady
      askForResult(); // Zavoláme funkci znovu pro další příklad
    }
    else
    {
    //console.log('Všechny odpovědi: ', poleodpovedi);
    rl.close();
    compareArrays (polevysledky, poleodpovedi); 
    }
  })
};

//Funkce pro porovnani dvou poli
function compareArrays (polevysledky, poleodpovedi) {
  for (let i = 0; i < polevysledky.length; i++) {
    if (polevysledky[i] == poleodpovedi[i]) {
      correctAnswersCount++; // Zvyšte počet, pokud se hodnoty neshodují
    }
  }
  console.log(`Pocet spravnych odpovedi je: ${correctAnswersCount} / ${numberOfExamples}`);
}

//funkce pro vytvareni prikladu
function createExamples ()  {
  for (let i = 0; i < numberOfExamples; i++) {
    generateRandomNumber();
   console.log(`priklad ${i + 1}:`);
   for (let j = 0; j < numberOfTerms; j++) {
    generateRandomNumber()
      generateRandomOperator()
      process.stdout.write(`${random} `); // Použijeme stdout pro vypisování na stejný řádek
     priklad += `${random}`;
     if (j+1 < numberOfTerms) {
      process.stdout.write(`${operator} `); // Použijeme stdout pro vypisování na stejný řádek
      priklad += `${operator}`;
    } else {
      process.stdout.write(`= `);  
    }
  }
  result = eval(priklad);
      //console.log(result);
      polevysledky.push(result);
      priklad = '';
  console.log(); // Přidáme nový řádek na konec
  }
//console.log(polevysledky);
askForResult();
}

// Funkce pro dotazování uživatele na pocet clenu v prikladech
function askForNumberOfTerms() {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (odpovedPPro) => {
      // Zkontroluj, zda je odpověď platná
      if (odpovedPPro >= 1 && odpovedPPro <= 9) {
        console.log(`Děkuji, pocet clenu bude: ${odpovedPPro}`);
        numberOfTerms = odpovedPPro;
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