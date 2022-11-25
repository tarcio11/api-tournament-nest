import * as bcrypt from 'bcrypt';
import { Hash } from '../../../src/infra/gateways/hash-handle';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

describe('Hash', () => {
  it('should call hash with correct values', async () => {
    const sut = new Hash();
    const spyCompare = jest.spyOn(bcrypt, 'hash');
    await sut.hash({ value: 'any_value' });
    expect(spyCompare).toHaveBeenCalledWith('any_value', 12);
  });

  it('should return a valid hash on hash success', async () => {
    const sut = new Hash();
    const hash = await sut.hash({ value: 'any_value' });
    expect(hash).toBe('hash');
  });

  it('should throw if hash throws', async () => {
    const sut = new Hash();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash({ value: 'any_value' });
    await expect(promise).rejects.toThrow();
  });
});
