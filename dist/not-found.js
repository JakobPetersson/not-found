#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const Checker_1 = __importDefault(require("./Checker"));
commander_1.default
    .version('1.0.0')
    .option('-u, --url [value]', 'Base URL', collect, [])
    .option('-p, --permutation [value]', 'Permutation', collect, [])
    .option('-f, --file [value]', 'Permutation file')
    .parse(process.argv);
function collect(val, strings) {
    strings.push(val);
    return strings;
}
const checker = new Checker_1.default(commander_1.default.url);
if (commander_1.default.file) {
    readline_1.default.createInterface({
        input: fs_1.default.createReadStream(commander_1.default.file)
    }).on('line', (line) => {
        checker.checkSingle(line);
    });
}
else {
    checker.checkAll(commander_1.default.permutation);
}
