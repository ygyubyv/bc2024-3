const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

// Налаштування виводу, щоб ігнорувати базові повідомлення
program.configureOutput({
  writeErr: (str) => {} // ігнорує всі помилки командера
});

program
  .requiredOption('-i, --input <path>', 'path to input JSON file')
  .option('-o, --output <path>', 'path to output JSON file')
  .option('-d, --display', 'display the result on the console')
  .exitOverride((err) => {
    if (err.code === 'commander.missingMandatoryOptionValue') {
      console.error("Please, specify the path to the input file.");
      process.exit(1);
    }
    throw err;
  });

program.parse(process.argv);

const options = program.opts();

// Перевірка чи існує вказаний файл
if (!fs.existsSync(options.input)) {
  console.error("Cannot find the input file.");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(options.input, 'utf8'));
} catch (err) {
  console.error("Error reading input file:", err);
  process.exit(1);
}

const filteredData = data
  .filter(item => item.ku === "13" && item.value > 5)
  .map(item => item.value);

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
