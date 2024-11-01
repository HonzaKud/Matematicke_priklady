const { compareArrays } = require('../comparison'); // import funkce compareArrays ze souboru comparison.js

// prvni test pro funkci compareArrays
test('compareArrays should count correct answers', () => { // test ma spravne spocitat odpovedi
    const resultsArray = [1, 2, 3]; // vytvoreni pole s vysledky, ktere budou reprezentovat spravne odpovedi
    const userAnswers = [1, 2, 4]; // vytvoreni pole s odpovedmi uzivatele, ktere bude porovnano s promennou resultsArray
    
    // vytvoreni spy na funkci console.log, ktera chyti vystup funkce, aniz by ho opravdu vypsala do konzole
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    compareArrays(resultsArray, userAnswers, 3); // zavolani funkce compareArrays, ktera porovna resultsArray a userAnswers. Pocet vygenerovanych prikladu je 3
  
    // kontrola, ze console.log byla zavolana s ocekavanym vystupem. To kontroluje, zda funkce `compareArrays` spravne vyhodnotila pocet spravnych odpovedi
    expect(spy).toHaveBeenCalledWith('Pocet spravnych odpovedi je: 2 / 3');
  
    spy.mockRestore(); // obnovi puvodni implementaci console.log a ukonci mockovani, aby se nepokracovalo v ovlivnovani dalsich casti programu
});