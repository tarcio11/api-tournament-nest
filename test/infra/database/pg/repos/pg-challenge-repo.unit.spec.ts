import { PgChallengeEntity, PgUserEntity } from '@/infra/database/pg/entities';
import { PgChallengeRepo } from '@/infra/database/pg/repos';
import { Challenge, User } from '@/domain/entities';
import { PgConnection } from '@/infra/database/pg/repos/helpers';
import { mockUserInput } from '@/test/mocks';
import { makeFakeDb } from '@/test/mocks/setup-db';
import { mockChallengeInput } from '@/test/mocks/entities/mock-challenge-mock';
import { getRepository, Repository } from 'typeorm';
import { IBackup } from 'pg-mem';

describe('PgChallengeRepo', () => {
  let pgUserRepo: Repository<PgUserEntity>;
  let sut: PgChallengeRepo;
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
    sut = new PgChallengeRepo();
  });

  afterAll(async () => await connection.disconnect());

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('add()', () => {
    it('should save() with correct params', async () => {
      const userMocked = mockUserInput();
      const pgUser = await pgUserRepo.save(userMocked);

      const user = new User(pgUser);
      const challenge = new Challenge(mockChallengeInput());
      user.createChallenge(challenge);
      const pgUserFound = await pgUserRepo.findOne({ where: { id: pgUser.id }, relations: ['challenges'] });

      if (pgUserFound) {
        await sut.add(user);
      }

      expect(pgUserFound?.challenges).toEqual([challenge]);
    });
  });

  describe('findChallengesByUser()', () => {
    it('should call findOne() with correct params', async () => {
      const userMocked = mockUserInput();
      const pgUser = await pgUserRepo.save(userMocked);

      const pgUserFound = await pgUserRepo.findOne({ where: { id: pgUser.id }, relations: ['challenges'] });

      if (pgUserFound) {
        await pgUserRepo.save(pgUserFound);
      }

      const exists = await sut.findChallengesByUser(pgUser.id);
      expect(exists).toEqual(pgUserFound);
    });
  });
});
