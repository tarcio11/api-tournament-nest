import { userModel, UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { PgUserEntity } from '@/infra/database/pg/entities/';
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

  async findAll(): Promise<UserData[]> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    return pgUserRepository.find();
  }

  async loadAccountByEmail(email: string): Promise<userModel | undefined> {
    const pgUserRepository = this.getRepository(PgUserEntity);
    return pgUserRepository.findOne({ where: { email } });
  }
}
