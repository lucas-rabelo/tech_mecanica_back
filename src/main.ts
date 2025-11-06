import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }));

  const documentBuilder = new DocumentBuilder()
    .setTitle('Tech Mecânica API')
    .setDescription('ERP NestJS API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    customCss: theme.getBuffer('dark' as SwaggerThemeName),
    customSiteTitle: 'Tech Mecânica API Docs',
  };

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup(`docs/api`, app, document, options);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
