import { MatchRepositoryAbstract } from '@/domain/contracts/repos/match';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { Challenge } from '@/domain/entities';
import { Injectable } from '@nestjs/common';
import { PgChallengeEntity } from '../../entities';

@Injectable()
export class PgMatchRepo extends PgRepository implements MatchRepositoryAbstract {
  async add(challenge: Challenge): Promise<void> {
    const pgMatchRepository = this.getRepository(PgChallengeEntity);
    await pgMatchRepository.save(challenge);
  }
}
