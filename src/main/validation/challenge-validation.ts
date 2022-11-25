import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChallengeValidation {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly user_id: string;
}
