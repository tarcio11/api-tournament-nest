import { UserAuthenticationUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { Hasher } from '@/domain/contracts/gateways';
import { UserData } from '@/domain/entities';
import { IException } from '@/domain/exceptions';
import { Injectable } from '@nestjs/common';
import { JwtServiceAbstract } from '@/domain/contracts/gateways/jwt-service';

type Input = { email: string; password: string };
type Output = { user: UserData; accessToken: string } | IException;

@Injectable()
export class UserAuthenticationUseCase implements UserAuthenticationUseCaseAbstract {
  constructor(
    private readonly userRepos: UserRepositoryAbstract,
    private readonly hash: Hasher,
    private readonly jwtService: JwtServiceAbstract,
    private readonly exceptionService: IException,
  ) {}

  async handle({ email, password }: Input): Promise<Output> {
    const user = await this.userRepos.loadAccountByEmail(email);
    if (user) {
      const isValidPassword = await this.hash.compare({ value: password, hash: user.password });
      if (isValidPassword) {
        const accessToken = this.jwtService.sign(user?.id);
        return {
          user,
          accessToken,
        };
      }
    }
    return this.exceptionService.UnauthorizedException({ message: 'Invalid credentials', code: '401' });
  }
}
