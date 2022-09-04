import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // ValidationPipeをグローバルにimport
  app.enableCors({
    origin: ['http://localhost:3000'], // バックエンドのアクセスを許可するフロントエンドのドメイン。whitelist式
    credentials: true, // jwtのcookieをフロントエンドに渡すために必要
  }); // CORSを有効化
  app.use(cookieParser); // フロントから受け取ったcookieをreq.cookiesに格納するために必要
  await app.listen(3005);
}
bootstrap();
