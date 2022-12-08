import { UploadUserAvatarUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { userModel, UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { StorageProviderAbstract } from '@/domain/contracts/gateways';
import { IException } from '@/domain/exceptions';
import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities';

type Input = {
  user: {
    id: string;
  };
  avatar: Express.Multer.File;
};

@Injectable()
export class UploadUserAvatarUseCase implements UploadUserAvatarUseCaseAbstract {
  constructor(
    private readonly userRepos: UserRepositoryAbstract,
    private readonly exceptionService: IException,
    private readonly storageProvider: StorageProviderAbstract,
  ) {}

  async handle(input: Input): Promise<userModel | undefined> {
    const user = await this.userRepos.findOne(input.user.id);
    if (user) {
      const avatar = await this.storageProvider.saveFile(input.user.id, input.avatar);
      user.avatar = avatar;
      const newUser = new User(user);
      return await this.userRepos.update(newUser);
    }
    this.exceptionService.badRequestException({ message: 'User not found', code: '400' });
  }
}
