import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ example: '3ecd7c72-4190-43d7-8633-8fa0d0993d1a' })
  id: string;
}
