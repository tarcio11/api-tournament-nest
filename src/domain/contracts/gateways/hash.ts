export abstract class Hasher {
  abstract hash: (data: Hasher.Input) => Promise<Hasher.Output>;
  abstract compare: (data: Hasher.CompareParams) => Promise<Hasher.CompareOutput>;
}

export namespace Hasher {
  export type Input = {
    value: string;
  };

  export type Output = string;

  export type CompareParams = {
    value: string;
    hash: string;
  };

  export type CompareOutput = boolean;
}
