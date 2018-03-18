#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import readline from 'readline';
import Checker from './Checker';

program
  .version('1.0.0')
  .option('-u, --url [value]', 'Base URL', collect, [])
  .option('-p, --permutation [value]', 'Permutation', collect, [])
  .option('-f, --file [value]', 'Permutation file')
  .parse(process.argv);

function collect(val: string, strings: string[]) {
  strings.push(val);
  return strings;
}

const checker = new Checker(program.url);

if (program.file) {
  readline.createInterface({
    input: fs.createReadStream(program.file)
  }).on('line', (line) => {
    checker.checkSingle(line);
  });
} else {
  checker.checkAll(program.permutation);
}
