const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pocetprikladu = null;
let pocetclenu = null;
let random = null;
let znak = null;
let priklad = "";
let vysledek;
let k = 0;
let polevysledky = [];
let poleodpovedi = [];
let spravneodpovedi = 0;

function generator() {
  const nahodne = Math.floor(Math.random()*9)+1; //generator nahodnych cisel mezi 1 az 9
  random = nahodne;
}

function nahodneZnamenko() {
  const znamenka = ['+', '-', '*']; // Pole obsahující matematická znaménka
  const index = Math.floor(Math.random() * znamenka.length); // Náhodně vybere index v poli
  znak = znamenka[index];
}

// Funkce pro dotazování uživatele na pocet prikladu
function zeptatSePP() {
  rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (odpovedPP) => {
    // Zkontroluj, zda je odpověď platná
    if (odpovedPP >= 1 && odpovedPP <= 9) {
      console.log(`Děkuji, pocet prikladu bude: ${odpovedPP}`);
      pocetprikladu = odpovedPP;
      zeptatSePPro(); //rl.close(); // Zavřít rozhraní, pokud je vstup platný
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
      zeptatSePP(); // Znovu se ptát uživatele
    }
  });
}

// Funkce pro dotazování uživatele na výsledek
function zeptatSeVysledek() {
  rl.question(`Napis vysledek prikladu cislo ${k + 1} :`, (odpovedVy) => {
    console.log('Děkuji');
    poleodpovedi.push(odpovedVy);  // Přidáme odpověď do pole 
    k++; // Zvětšíme k o 1 pro další příklad
    
    if (k < pocetprikladu) { // Ověření, zda jsme ještě neprošli všechny příklady
      zeptatSeVysledek(); // Zavoláme funkci znovu pro další příklad
    }
    else
    {
    console.log('Všechny odpovědi: ', poleodpovedi);
    rl.close();
    porovnaniPoli (polevysledky, poleodpovedi);
    
    }
  })
};

//Funkce pro porovnani dvou poli
function porovnaniPoli (polevysledky, poleodpovedi) {
  for (let i = 0; i < polevysledky.length; i++) {
    if (polevysledky[i] == poleodpovedi[i]) {
      spravneodpovedi++; // Zvyšte počet, pokud se hodnoty neshodují
    }
  }
  console.log(`Pocet spravnych odpovedi je: ${spravneodpovedi} / ${pocetprikladu}`);
}


function generacePrikladu ()  {
for (let i = 0; i < pocetprikladu; i++) {
  generator();
  console.log(`priklad ${i + 1}:`);
  for (let j = 0; j < pocetclenu; j++) {
    generator()
    nahodneZnamenko()
    process.stdout.write(`${random} `); // Použijeme stdout pro vypisování na stejný řádek
    priklad += `${random}`;
    if (j+1 < pocetclenu) {
      process.stdout.write(`${znak} `); // Použijeme stdout pro vypisování na stejný řádek
      priklad += `${znak}`;
    } else {
      process.stdout.write(`= `);  
    }
  }
  vysledek = eval(priklad);
      console.log(vysledek);
      polevysledky.push(vysledek);
      priklad = '';
  console.log(); // Přidáme nový řádek na konec
}
console.log(polevysledky);
zeptatSeVysledek();
}










// Funkce pro dotazování uživatele na pocet clenu v prikladech
function zeptatSePPro() {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (odpovedPPro) => {
      // Zkontroluj, zda je odpověď platná
      if (odpovedPPro >= 1 && odpovedPPro <= 9) {
        console.log(`Děkuji, pocet clenu bude: ${odpovedPPro}`);
        pocetclenu = odpovedPPro;
         // Generace poctu prikladu
             generacePrikladu()
      } else {
        console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
        zeptatSePPro(); // Znovu se ptát uživatele
      }
    });
  }

// Spusť funkci
zeptatSePP();