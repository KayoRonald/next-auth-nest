import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'The title of the book',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({
    example: 'An epic fantasy trilogy by J.R.R. Tolkien.',
    description: 'The description of the book',
  })
  description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://example.com/book-thumbnail.jpg',
    description: 'The thumbnail image URL',
  })
  thumbnail: string;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 29.99,
    description: 'The price of the book',
  })
  price: number;
}
