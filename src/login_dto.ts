import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: 'email', example: 'user@example.com' })
  email: string;
  @ApiProperty({ name: 'password', example: 'password123' })
  password: string;
}
