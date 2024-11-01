// importujeme funkci, kterou chceme testovat
const { createExamples } = require('../exampleGenerator'); // importujeme funkci createExamples z modulu exampleGenerator

// mockujeme funkci askForResult ze souboru userInput, abychom ji mohli testovat bez implementace
jest.mock('../userInput', () => ({
  askForResult: jest.fn((rl, numberOfExamples, resultsArray, callback) => callback(resultsArray, []))
}));

// mockujeme rozhrani readline
const readline = require('readline'); //importujeme knihovnu readline
const rl = readline.createInterface({ // rozhrani pro cteni vstupu z terminálu
  input: process.stdin,
  output: process.stdout
});

// mockujeme modul randomGenerators
jest.mock('../randomGenerators', () => ({
    generateRandomNumber: jest.fn(() => 2), // nastavime, ze generateRandomNumber vzdy vrati 2
    generateRandomOperator: jest.fn(() => '+') // nastavime, ze generateRandomOperator vzdy vrati +
  }));

// definujeme testovaci skupinu pro funkci createExamples
describe('createExamples', () => {
  // spousti se pred kazdym testem v ramci skupiny, vymaze vsechny existujici mocky
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // první test pro kontrolu, zda createExamples vygeneruje spravny pocet prikladu
  test('should generate the correct number of examples', () => {
    const numberOfExamples = 3; //nastavi pocet prikladu na 3
    const numberOfTerms = 2; //nastavi pocet znaku na 2
    const callback = jest.fn(); // funkce callback jako jest.fn(), abych mohl zkontrolovat jeji volani

    // spousteni funkcecreateExamples s testovacimi parametrama
    createExamples(rl, numberOfExamples, numberOfTerms, callback);

    // zjistime, jestli funkce askForResult byla volana se spravnym poctem vysledku
    const { askForResult } = require('../userInput');
    expect(askForResult).toHaveBeenCalledWith(rl, numberOfExamples, expect.any(Array), callback);
  });

  // druhy test pro kontrolu, zda createExamples vygeneruje spravny aritmeticky vyraz
  test('should generate valid arithmetic expressions', () => {
    const numberOfExamples = 1; //pocet clenu je 1
    const numberOfTerms = 3; // pocet znaku jsou 3
    const callback = jest.fn(); // vytvarime funkci callback jako jest.fn()

    // spusteni funkce createExamples
    createExamples(rl, numberOfExamples, numberOfTerms, callback);

    // ocekavam ze prikllad bude 2 + 2 + 2
    const { askForResult } = require('../userInput');
    const expectedResult = eval('2 + 2 + 2');
    expect(askForResult).toHaveBeenCalledWith(rl, numberOfExamples, [expectedResult], callback);
  });

  //po vsech testech se spusti a zavre readline
  afterAll(() => {
    rl.close();
  });
});