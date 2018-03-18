import Status from './Status';
export default class Result {
    readonly permutation: string;
    readonly results: Status[];
    constructor(permutation: string, results: Status[]);
    toString(padLength?: number): string;
    private allMatch(matcher);
}
