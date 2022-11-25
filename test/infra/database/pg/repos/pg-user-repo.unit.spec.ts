import { makeFakeDb } from '@/../test/mocks/setup-db';
import { PgUserEntity } from '@/infra/database/pg/entities';
import { PgUserRepo } from '@/infra/database/pg/repos';
import { mockUserInput } from '@/test/mocks/pg-user-mock';
import { PgConnection } from '@/infra/database/pg/repos/helpers';
import { PgChallengeEntity } from '@/infra/database/pg/entities';

import { getRepository, Repository } from 'typeorm';
import { IBackup } from 'pg-mem';

describe('PgUserRepo', () => {
  let pgUserRepo: Repository<PgUserEntity>;
  let sut: PgUserRepo;
  let connection: PgConnection;
  let backup: IBackup;

  beforeAll(async () => {
    connection = PgConnection.getInstance();
    const db = await makeFakeDb([PgUserEntity, PgChallengeEntity]);
    backup = db.backup();
    pgUserRepo = getRepository(PgUserEntity);
  });

  beforeEach(async () => {
    backup.restore();
    sut = new PgUserRepo();
  });

  afterAll(async () => await connection.disconnect());

  describe('add()', () => {
    it('should add a user on success', async () => {
      const userMocked = mockUserInput();
      await sut.add(userMocked);
      const user = await pgUserRepo.findOne({ where: { email: userMocked.email } });

      expect(user?.email).toBe(userMocked.email);
    });
  });

  describe('checkByEmail()', () => {
    it('should return true if email exists', async () => {
      const user = await pgUserRepo.save(mockUserInput());

      const exists = await sut.checkByEmail(user.email);

      expect(exists).toBe(true);
    });

    it('should return false if email does not exists', async () => {
      const exists = await sut.checkByEmail('any_email@email.com');
      expect(exists).toBe(false);
    });
  });

  describe('findAll()', () => {
    it('should return a list of users', async () => {
      const user = await pgUserRepo.save(mockUserInput());
      const users = await sut.findAll();

      expect(users).toEqual([user]);
    });
  });

  describe('loadAccountByEmail()', () => {
    it('should return an account on success', async () => {
      const user = await pgUserRepo.save(mockUserInput());
      const account = await sut.loadAccountByEmail(user.email);

      expect(account).toEqual(user);
    });

    it('should return undefined if email does not exists', async () => {
      const account = await sut.loadAccountByEmail('any_email@email.com');
      expect(account).toBeUndefined();
    });
  });
});
