export class EmailInUseException extends Error {
  constructor() {
    super('Email already in use');
    this.name = 'EmailInUseException';
  }
}
