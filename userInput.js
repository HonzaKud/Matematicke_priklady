// Funkce pro dotazovani uzivatele na pocet prikladu
function askForNumberOfExamples(rl, callback) {
  // Pomocna funkce na opakovane dotazovani, je tu kvuli tomu, aby neprobihala rekurze
  function promptForExample () {
    rl.question('Napis kolik mam vytvorit prikladu (napis cislo od 1 do 9): ', (userExampleCountInput) => { // Dotaz na pocet prikladu a cekani na odpoved
      const numberOfExamples = parseInt(userExampleCountInput); // Pripadne prevedeni vstupu od uzivatele na cele cislo, a prevedeni ho na promenou numberOfExamples

      // Kontrola spravnosti odpovedi, jestli je vstup cislo mezi 1 a 9 
      if (!isNaN(numberOfExamples) && numberOfExamples >= 1 && numberOfExamples <= 9) { //vykricnik znamena negace a NaN znamena not a number, overeni ze je to cislo
        console.log(`Děkuji, pocet prikladu bude: ${numberOfExamples}`); // Vypis odpovědi
        
      
        // Zavolani dalsi funkce, ktera se pta na pocet clenu
        askForNumberOfTerms(rl, (numberOfTerms) => {
          callback(numberOfExamples, numberOfTerms); // Tato funkce preda pocet prikladu a pocet clenu pro dalsi kroky programu
        });

      } else {
        console.log('Neplatny vstup. Zkus to znovu.'); // Zprava o neplatnem vstupu
        promptForExample(); // Znovu zavola funkci, kdyz je neplatny vstup
      }
    });
  }

  //Spustime pomocnou funkci poprve
  promptForExample();
}

// Funkce pro dotazovani uzivatele na pocet clenu v prikladech
function askForNumberOfTerms(rl, callback) {
  //pomocna funkce promtForTerms, aby nedochazeli k rekurzi
  function promptForTerms () {
    rl.question('Napis kolik ma mit kazdy priklad clenu (napis cislo od 1 do 9)', (userTermsCountInput) => { //dotaz na pocet clenu a cekani na odpoved
      const termsCount = parseInt(userTermsCountInput); // prevod vstupu na cislo a prevedeni do promenne termsCount
    
      // zkontroluj, zda je odpoved spravna
      if (!isNaN(termsCount) && termsCount >= 1 && termsCount <= 9) { //vykricnik znamena negace a NaN znamena not a number, overeni ze je to cislo
        console.log(`Děkuji, pocet clenu bude: ${userTermsCountInput}`); //vypsani odpovedi
        callback (termsCount); // Zavolani hlavniho callbacku s poctem clenu
      } else {
        console.log('Neplatný vstup. Zkus to znovu.'); // pokud na vstupu uzivatel napise kravinu
        promptForTerms(); // znovu se zeptame uzivatele na pocet clenu
      }
    });
  }

//prvni volani funkce
  promptForTerms();
}

// Funkce pro dotazovani uzivatele na vysledek
function askForResult(rl, numberOfExamples, resultsArray, callback) {
  let exampleIndex = 0; // Promenna pro sledovani indexu aktualniho prikladu
  let userAnswers = []; // Pole pro odpovedi uzivatele

  // pomocna funkce pro postupne dotazovani uzivatele na priklady, je tu aby nedochazelo k rekurzi
  function promptForResult() {
    if(exampleIndex < numberOfExamples) { //pokud je index prikladu mensi nez pocet prikladu, pak
      rl.question(`Napis vysledek prikladu cislo ${exampleIndex + 1} :`, (userAnswerInput) => { //dotaz na vysledky prikladu a cekani na odpoved
        console.log('Děkuji'); // vypsani odpovedi
        userAnswers.push(parseInt(userAnswerInput)); // Pridani odpovedi do pole 
        exampleIndex++; // Zvetseni promenne exampleIndex o 1 pro dalsi priklad
        promptForResult(); // zavolani opet funkce promptForResult
      });
    } else {
      //console.log('Všechny odpovědi: ', userAnswers); // overeni jestli jsou v promenne userAnswers spravna data
      rl.close(); //zavreni readline
      if (typeof callback === 'function') {
        callback(resultsArray, userAnswers);
      }
    }
  }

  //spustime dotaz na poprve
  promptForResult();
}

module.exports = { askForNumberOfExamples, askForNumberOfTerms, askForResult }; // exportovani funkce pro dalsi vyuziti