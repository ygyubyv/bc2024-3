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

let data;
try {
  data = JSON.parse(fs.readFileSync(options.input, 'utf8'));
} catch (err) {
  console.error("Error reading input file:", err);
  process.exit(1);
}

const filteredData = data.filter(item => item.ku === 13 && item.value > 5);

if (options.display) {
  console.log(filteredData);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, JSON.stringify(filteredData, null, 2));
  } catch (err) {
    console.error("Error writing output file:", err);
  }
}
