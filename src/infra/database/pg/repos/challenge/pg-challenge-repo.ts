import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { PgChallengeEntity, PgUserEntity } from '@/infra/database/pg/entities';
import { Challenge, UserData } from '@/domain/entities';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PgChallengeRepo extends PgRepository implements ChallengeRepositoryAbstract {
  async add(user: UserData): Promise<void> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    await pgUserRepository.save(user);
  }

  async findChallengesByUser(user_id: string): Promise<PgUserEntity | undefined> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    const pgChallengeEntity = this.getRepository(PgChallengeEntity);
    const pgUser = await pgUserRepository.findOne({ where: { id: user_id }, relations: ['challenges'] });

    const challenges = await pgChallengeEntity.find({
      where: { challenged_id: pgUser?.id, status: 'PENDING' },
    });
    pgUser?.challenges?.push(...challenges);
    if (!pgUser) {
      throw new Error('User not found');
    }
    return pgUser.challenges ? { ...pgUser } : pgUser;
  }

  async update(challenge: Challenge): Promise<void> {
    const pgChallengeEntity = this.getRepository(PgChallengeEntity);
    await pgChallengeEntity.save(challenge);
  }

  async findAll(): Promise<any> {
    const pgChallengeRepository = this.getRepository(PgChallengeEntity);
    return pgChallengeRepository.find();
  }

  async findOne(id: string): Promise<Challenge | undefined> {
    const pgChallengeRepository = this.getRepository(PgChallengeEntity);
    return pgChallengeRepository.findOne({ where: { id } });
  }
}
