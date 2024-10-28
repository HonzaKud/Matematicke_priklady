// Funkce pro dotazovani uzivatele na pocet prikladu
function askForNumberOfExamples(rl, callback) {
    rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9)', (userExampleCountInput) => { //dotaz na pocet prikladu a cekani na odpoved
      // Kontrola spravnosti odpovedi
      if (userExampleCountInput >= 1 && userExampleCountInput <= 9) {
        console.log(`Děkuji, pocet prikladu bude: ${userExampleCountInput}`); // vypsani odpovedi
        callback (parseInt(userExampleCountInput)); //prepsani promenne do globalni promenne numberOfExamples
      } else {
        console.log('Neplatny vstup. Zkus to znovu.'); // Zprava o neplatnem vstupu
        askForNumberOfExamples(rl, callback); // Znovu se ptat uzivatele
      }
    });
  }

// Funkce pro dotazovani uzivatele na pocet clenu v prikladech
function askForNumberOfTerms(rl, callback) {
  rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (userTermsCountInput) => { //dotaz na pocet clenu a cekani na odpoved
    // zkontroluj, zda je odpoved spravna
    if (userTermsCountInput >= 1 && userTermsCountInput <= 9) {
      console.log(`Děkuji, pocet clenu bude: ${userTermsCountInput}`); //vypsani odpovedi
      callback (parseInt(userTermsCountInput));
      //numberOfTerms = userTermsCountInput; //ulozeni odpovedi do globalni promenne numberOfTerms
       // Generace poctu prikladu
           // createExamples() // zavola funkci na vytvoreni prikladu
    } else {
      console.log('Neplatný vstup. Zkus to znovu.'); // pokud na vstupu uzivatel napise kravinu
      askForNumberOfTerms(rl, callback); // znovu se zeptame uzivatele na pocet clenu
    }
  });
}



  module.exports = { askForNumberOfExamples, askForNumberOfTerms };