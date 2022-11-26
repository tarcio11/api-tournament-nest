export abstract class JwtServiceAbstract {
  abstract sign: (plaintext: string) => string;
}
