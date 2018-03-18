import request from 'request-promise-native';
import Result from './Result';
import Status from './Status';

export default class Checker {

  private readonly baseUrls: string[];

  constructor(baseUrls: string[]) {
    this.baseUrls = baseUrls;
    this.printBaseUrls();
  }

  public checkSingle(permutation: string, padLength?: number) {
    (async () => {
      const result = await this.checkPermutation(permutation);
      process.stdout.write(result.toString(padLength));
    })();
  }

  public checkAll(permutations: string[]) {
    const padLength = permutations.reduce((a, b) => {
      return a.length > b.length ? a : b;
    }, '').length;

    permutations.forEach((permutation) => this.checkSingle(permutation, padLength));
  }

  public toString() {
    return `Base URLS[${this.baseUrls.length}]:\n` + this.baseUrls.join('\n') + '\n\n';
  }

  private printBaseUrls() {
    process.stdout.write(this.toString());
  }

  private async checkPermutation(permutation: string) {
    const results = await Promise.all(this.baseUrls.map((baseUrl) => this.checkStatus(baseUrl + permutation)));
    return new Result(permutation, results);
  }

  private async checkStatus(url: string): Promise<Status> {
    try {
      const response = await request({
        method: 'GET',
        uri: url,
        simple: false,
        resolveWithFullResponse: true
      });
      return new Status(url, response.statusCode);
    } catch (e) {
      return new Status(url);
    }
  }

}
