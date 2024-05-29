import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Book test in nest')
  .addBearerAuth()
  .setDescription('The book API description')
  .setVersion('1.0')
  .build();
