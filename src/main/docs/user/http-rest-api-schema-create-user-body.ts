import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateUserBody {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  public name: string;

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
