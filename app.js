const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'path to input JSON file')
  .option('-o, --output <path>', 'path to output JSON file')
  .option('-d, --display', 'display the result on the console')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file.");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file.");
  process.exit(1);
}

