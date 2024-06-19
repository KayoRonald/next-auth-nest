import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config as swaggerConfig } from './common/config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { validationPipe } from './common/validation/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('port');
  console.log(port);
  //Docs swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(validationPipe);
  app.useGlobalGuards();
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port, () => {
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
