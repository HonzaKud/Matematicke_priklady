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

  module.exports = { askForNumberOfExamples };