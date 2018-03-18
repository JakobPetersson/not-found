"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Status {
    constructor(url, statusCode) {
        this.url = url;
        this.statusCode = statusCode;
    }
    isNotFound() {
        return this.statusCode === 404;
    }
    isFound() {
        return this.statusCode && this.statusCode >= 200 && this.statusCode < 300;
    }
    toString() {
        if (this.isNotFound()) {
            return colors_1.default.bgGreen('   ');
        }
        else if (this.isFound()) {
            return colors_1.default.bgRed('   ');
        }
        return colors_1.default.bgYellow(this.statusCode ? this.statusCode.toString() : '???');
    }
}
exports.default = Status;
