export abstract class JwtServiceAbstract {
  abstract sign: (plaintext: string) => string;
  abstract verify: (ciphertext: string) => Promise<string>;
}
