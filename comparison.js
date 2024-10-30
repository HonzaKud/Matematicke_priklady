//Funkce pro porovnani dvou poli
function compareArrays (resultsArray, userAnswers, numberOfExamples) {  //funkce pro porovnani dvou poli resultsArray a userAnswers
  let correctAnswersCount = 0; // vytvoreni a nastaveni prommene na hodnotu 0
  for (let i = 0; i < resultsArray.length; i++) { // cyklus pro prochazeni jednotlivych hodnotach v polich
   if (resultsArray[i] == userAnswers[i]) { // pokud se hodnoty v poli shoduji
      correctAnswersCount++; // Zvysi se pocet o 1 v poctu spravnych odpovedi
    }
  }
  console.log(`Pocet spravnych odpovedi je: ${correctAnswersCount} / ${numberOfExamples}`); // vypsani poctu spravnych odpovedi a poctu celkovych odpovedi
}

module.exports = { compareArrays }; // exportovani funkce pro dalsi vyuziti