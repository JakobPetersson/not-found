export default class Status {
    readonly statusCode?: number;
    readonly url: string;
    constructor(url: string, statusCode?: number);
    isNotFound(): boolean;
    isFound(): boolean | 0 | undefined;
    toString(): string;
}
