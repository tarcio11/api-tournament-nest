import { ShowRankingUseCaseAbstract } from '../abstract-cases';
import { RankingRepositoryAbstract, RankingResponse } from '@/domain/contracts/repos/ranking';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowRankingUseCase implements ShowRankingUseCaseAbstract {
  constructor(private readonly rankingRepo: RankingRepositoryAbstract) {}

  async handle(): Promise<RankingResponse[]> {
    try {
      return this.rankingRepo.findAll();
    } catch (error: any) {
      throw error;
    }
  }
}
