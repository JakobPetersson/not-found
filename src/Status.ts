import colors from 'colors';

export default class Status {
  public readonly statusCode?: number;
  public readonly url: string;

  constructor(url: string, statusCode?: number) {
    this.url = url;
    this.statusCode = statusCode;
  }

  public isNotFound() {
    return this.statusCode === 404;
  }

  public isFound() {
    return this.statusCode && this.statusCode >= 200 && this.statusCode < 300;
  }

  public toString() {
    if (this.isNotFound()) {
      return colors.bgGreen('   ');
    } else if (this.isFound()) {
      return colors.bgRed('   ');
    }
    return colors.bgYellow(this.statusCode ? this.statusCode.toString() : '???');
  }
}
