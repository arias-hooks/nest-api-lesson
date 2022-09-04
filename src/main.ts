import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // class-validatorを使うために必要。whitelistは、クライアントから送られてきたデータに、クラスに定義されていないプロパティがあった場合に、そのプロパティを無視するかどうかを決めるもの。trueにすると無視する。
  app.enableCors({
    origin: ['http://localhost:3000'], // バックエンドのアクセスを許可するフロントエンドのドメイン。whitelist式
    credentials: true, // jwtのcookieをフロントエンドに渡すために必要
  }); // CORSを有効化
  app.use(cookieParser());
  await app.listen(3005);
}
bootstrap();
