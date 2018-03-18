"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Result {
    constructor(permutation, results) {
        this.permutation = permutation;
        this.results = results;
    }
    toString(padLength) {
        let buffer = '';
        const text = (this.permutation + ' '.repeat(padLength || 0)).substr(0, padLength);
        if (this.allMatch((status) => status.isNotFound())) {
            buffer += colors_1.default.bgGreen(text);
        }
        else {
            buffer += text;
        }
        buffer += ': ';
        buffer += this.results.map((status) => status.toString()).join();
        buffer += '\n';
        return buffer;
    }
    allMatch(matcher) {
        return this.results.every(matcher);
    }
}
exports.default = Result;
