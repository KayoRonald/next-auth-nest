// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'The username of the user.',
    example: 'John Doe',
  })
  username: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Timestamp when the user was created.',
    example: '2024-02-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated.',
    example: '2024-02-01T12:30:00Z',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
