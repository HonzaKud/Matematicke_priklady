const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funkce pro dotazování uživatele na pocet prikladu
function zeptatSePP() {
  rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (odpovedPP) => {
    // Zkontroluj, zda je odpověď platná
    if (odpovedPP >= 1 && odpovedPP <= 9) {
      console.log(`Děkuji, pocet prikladu bude: ${odpovedPP}`);
      zeptatSePPro(); //rl.close(); // Zavřít rozhraní, pokud je vstup platný
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
      zeptatSePP(); // Znovu se ptát uživatele
    }
  });
}

// Funkce pro dotazování uživatele na pocet clenu v prikladech
function zeptatSePPro() {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (odpovedPPro) => {
      // Zkontroluj, zda je odpověď platná
      if (odpovedPPro >= 1 && odpovedPPro <= 9) {
        console.log(`Děkuji, pocet clenu bude: ${odpovedPPro}`);
        rl.close(); // Zavřít rozhraní, pokud je vstup platný
      } else {
        console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
        zeptatSePPro(); // Znovu se ptát uživatele
      }
    });
  }

// Spusť funkci
zeptatSePP();
