export default class Checker {
    private readonly baseUrls;
    constructor(baseUrls: string[]);
    checkSingle(permutation: string, padLength?: number): void;
    checkAll(permutations: string[]): void;
    toString(): string;
    private printBaseUrls();
    private checkPermutation(permutation);
    private checkStatus(url);
}
