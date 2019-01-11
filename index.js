const ts = require('typescript');

const source = 'types.ts';

const program = ts.createProgram([source], {});
const checker = program.getTypeChecker();
const file = program.getSourceFile(source);

const ex = checker.getExportsOfModule(file.symbol);

const output = {};

ex.forEach(symbol => {
    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
    const types = checker.getAllPossiblePropertiesOfTypes([type]).map(type => type.getName());

    output[symbol.getName()] = types;
});

const json = JSON.stringify(output, undefined, 2);

console.log(`export default ${json}`);
