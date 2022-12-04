import { userModel, UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { PgChallengeEntity, PgUserEntity } from '@/infra/database/pg/entities/';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { Injectable } from '@nestjs/common';
import { User, UserData } from '@/domain/entities';

@Injectable()
export class PgUserRepo extends PgRepository implements UserRepositoryAbstract {
  async add(data: User): Promise<any> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    const user = pgUserRepository.create(data);
    return await pgUserRepository.save(user);
  }

  async checkByEmail(email: string): Promise<boolean> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    return pgUserRepository.findOne({ where: { email } }).then((user) => !!user);
  }

  async findAll(): Promise<any> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    return pgUserRepository.find();
  }

  async loadAccountByEmail(email: string): Promise<userModel | undefined> {
    const pgUserRepository = this.getRepository(PgUserEntity);

    return pgUserRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<userModel | undefined> {
    try {
      const pgUserRepository = this.getRepository(PgUserEntity);
      const pgChallengeEntity = this.getRepository(PgChallengeEntity);
      const user = await pgUserRepository.findOne({ where: { id }, relations: ['challenges'] });
      const challenges = await pgChallengeEntity
        .createQueryBuilder('challenge')
        .where('challenge.challenged_id = :id or challenge.user_id = :user_id', { id, user_id: user?.id })
        .andWhere('challenge.status IN (:...status)', { status: ['PENDING', 'ACCEPTED'] })
        .getMany();

      if (!user) {
        throw new Error('User not found');
      }
      console.log(challenges);

      return user.challenges ? { ...user, challenges } : user;
    } catch (error) {
      console.log(error);
    }
  }
}
