import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiResponseUser {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'f4a4f4a4-4f4a-4f4a-4f4a-4f4a4f4a4f4a',
  })
  public id: string;

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
    format: 'date-time',
    example: '2022-11-18T19:40:26.691Z',
  })
  public created_at: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2022-11-18T19:40:26.691Z',
  })
  public updated_at: string;
}
