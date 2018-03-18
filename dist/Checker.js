"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const Result_1 = __importDefault(require("./Result"));
const Status_1 = __importDefault(require("./Status"));
class Checker {
    constructor(baseUrls) {
        this.baseUrls = baseUrls;
        this.printBaseUrls();
    }
    checkSingle(permutation, padLength = 20) {
        (() => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.checkPermutation(permutation);
            process.stdout.write(result.toString(padLength));
        }))();
    }
    checkAll(permutations) {
        const padLength = permutations.reduce((a, b) => {
            return a.length > b.length ? a : b;
        }, '').length;
        permutations.forEach((permutation) => this.checkSingle(permutation, padLength));
    }
    toString() {
        return `Base URLS[${this.baseUrls.length}]:\n` + this.baseUrls.join('\n') + '\n\n';
    }
    printBaseUrls() {
        process.stdout.write(this.toString());
    }
    checkPermutation(permutation) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Promise.all(this.baseUrls.map((baseUrl) => this.checkStatus(baseUrl + permutation)));
            return new Result_1.default(permutation, results);
        });
    }
    checkStatus(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield request_promise_native_1.default({
                    method: 'GET',
                    uri: url,
                    simple: false,
                    resolveWithFullResponse: true
                });
                return new Status_1.default(url, response.statusCode);
            }
            catch (e) {
                return new Status_1.default(url);
            }
        });
    }
}
exports.default = Checker;
