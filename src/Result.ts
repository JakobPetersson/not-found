import colors from 'colors';
import Status from './Status';

export default class Result {
  public readonly permutation: string;
  public readonly results: Status[];

  constructor(permutation: string, results: Status[]) {
    this.permutation = permutation;
    this.results = results;
  }

  public toString(padLength?: number) {
    let buffer = '';
    const text = (this.permutation + ' '.repeat(padLength || 0)).substr(0, padLength);
    if (this.allMatch((status) => status.isNotFound())) {
      buffer += colors.bgGreen(text);
    } else {
      buffer += text;
    }
    buffer += ': ';
    buffer += this.results.map((status) => status.toString()).join('');
    buffer += '\n';
    return buffer;
  }

  private allMatch(matcher: (status: Status) => (boolean)) {
    return this.results.every(matcher);
  }
}
