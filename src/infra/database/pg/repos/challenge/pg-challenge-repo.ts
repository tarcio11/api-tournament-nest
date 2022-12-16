import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { PgChallengeEntity, PgUserEntity } from '@/infra/database/pg/entities';
import { Challenge } from '@/domain/entities';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PgChallengeRepo extends PgRepository implements ChallengeRepositoryAbstract {
  async add(data: Challenge): Promise<any> {
    const pgChallengeEntity = this.getRepository(PgChallengeEntity);
    return pgChallengeEntity.save(data);
  }

  async findChallengesByUser(user_id: string): Promise<any> {
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

  async update(challenge: Challenge): Promise<any> {
    const pgChallengeEntity = this.getRepository(PgChallengeEntity);
    return await pgChallengeEntity.save(challenge);
  }

  async findAll(): Promise<any> {
    const pgChallengeRepository = this.getRepository(PgChallengeEntity);
    return pgChallengeRepository.find();
  }

  async findOne(id: string): Promise<any> {
    const pgChallengeRepository = this.getRepository(PgChallengeEntity);
    return pgChallengeRepository.findOne({ where: { id }, relations: ['matches'] });
  }
}
