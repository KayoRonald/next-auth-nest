import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of books',
    type: BookEntity,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async findAll(): Promise<BookEntity[]> {
    const books = await this.bookService.findAll();
    return books.map((book) => new BookEntity(book));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found book',
    type: BookEntity,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async findOne(@Param('id') id: string): Promise<BookEntity> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return new BookEntity(book);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The created book',
    type: BookEntity,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async create(@Body() data: CreateBookDto): Promise<BookEntity> {
    const createdBook = await this.bookService.create(data);
    return new BookEntity(createdBook);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated book',
    type: BookEntity,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async update(
    @Param('id') id: string,
    @Body() data: CreateBookDto,
  ): Promise<BookEntity> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = await this.bookService.update(id, data);
    return new BookEntity(updatedBook);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async remove(@Param('id') id: string): Promise<void> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookService.remove(id);
  }
}
