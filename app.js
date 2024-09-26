//vypis
console.log("Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)");

const readline = require('readline');

// Vytvoření rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funkce pro dotazování uživatele
function zeptatSe() {
  rl.question('Zadej číslo od 1 do 9: ', (odpoved) => {
    // Zkontroluj, zda je odpověď platná
    if (odpoved >= 1 && odpoved <= 9) {
      console.log(`Děkuji, zvolil(a) jsi číslo: ${odpoved}`);
      rl.close(); // Zavřít rozhraní, pokud je vstup platný
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // Zpráva o neplatném vstupu
      zeptatSe(); // Znovu se ptát uživatele
    }
  });
}

// Spusť funkci
zeptatSe();
