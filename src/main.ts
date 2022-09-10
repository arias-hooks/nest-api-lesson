import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // class-validatorを使うために必要。whitelistは、クライアントから送られてきたデータに、クラスに定義されていないプロパティがあった場合に、そのプロパティを無視するかどうかを決めるもの。trueにすると無視する。
  app.enableCors({
    origin: ['http://localhost:3000'], // バックエンドのアクセスを許可するフロントエンドのドメイン。whitelist式
    credentials: true, // jwtのcookieをフロントエンドに渡すために必要
  }); // CORSを有効化
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true, // trueにするとhttpsでないとcookieが送られない
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
