import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { PgUserEntity } from '@/infra/database/pg/entities';
import { UserData } from '@/domain/entities';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PgChallengeRepo extends PgRepository implements ChallengeRepositoryAbstract {
  async add(user: UserData): Promise<void> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    await pgUserRepository.save(user);
  }

  async findChallengesByUser(user_id: string): Promise<PgUserEntity | undefined> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    const pgUser = await pgUserRepository.findOne({ where: { id: user_id }, relations: ['challenges'] });

    if (!pgUser) {
      throw new Error('User not found');
    }

    return pgUser;
  }
}
