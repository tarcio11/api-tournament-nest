import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelUserAuthenticationBody {
  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'jhonDoe@mail.com',
  })
  public email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    example: 'any_password',
  })
  public password: string;
}
