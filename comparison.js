//Funkce pro porovnani dvou poli
function compareArrays (resultsArray, userAnswers, numberOfExamples) { 
  let correctAnswersCount = 0;
  for (let i = 0; i < resultsArray.length; i++) { // cyklus pro prochazeni jednotlivych hodnotach v polich
   if (resultsArray[i] == userAnswers[i]) { // pokud se pole shoduji
      correctAnswersCount++; // Zvysi se pocet o 1, dokud se hodnoty nebudou shodovat
    }
  }
  console.log(`Pocet spravnych odpovedi je: ${correctAnswersCount} / ${numberOfExamples}`); // vypsani poctu spravnych odpovedi a poctu celkovych odpovedi
}

module.exports = { compareArrays };