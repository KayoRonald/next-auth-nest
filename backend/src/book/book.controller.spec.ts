import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let appController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    appController = app.get<BookController>(BookController);
    console.log(appController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController).toBeDefined();
    });
  });
});
