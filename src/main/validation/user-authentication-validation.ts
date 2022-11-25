import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthenticationValidation {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
