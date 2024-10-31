const { generateRandomNumber, generateRandomOperator } = require('../randomGenerators'); // import funkcc generateRandomNumber a generateRandomOperator ze souboru randomGenerators.js

// prvni test pro funkci generateRandomNumber
test('generateRandomNumber should return a number between 1 and 9', () => { // tato funkce by mela vratit cislo mezi 1 a 9
  const number = generateRandomNumber(); // zavolam funkci generateRandomNumber a ulozime vysledek do promenne number
  expect(number).toBeGreaterThanOrEqual(1); // ocekavam, ze hodnota number bude vetsi nebo rovna 1
  expect(number).toBeLessThanOrEqual(9); // ocekavam, ze hodnota number bude mensi nebo rovna 9
});

// druhy test pro funkci generateRandomOperator
test('generateRandomOperator should return one of "+", "-", "*"', () => { // tato funkce by mela vratit znak +, -, nebo *
  const operator = generateRandomOperator(); // zavolam funkci generateRandomOperator a ulozime vysledek do promenne operator
  expect(['+', '-', '*']).toContain(operator); // ocekavam, ze vysledek bude jednou z hodnot v poli ['+', '-', '*']
});