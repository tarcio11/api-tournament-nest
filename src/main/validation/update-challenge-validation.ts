import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateChallengeValidation {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
