import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ID {
  @ApiProperty({ example: '3ecd7c72-4190-43d7-8633-8fa0d0993d1a' })
  @IsUUID()
  id: string;
}
