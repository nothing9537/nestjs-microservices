import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(CookieParser());

  const configService = app.get(ConfigService);

  await app.listen(+configService.get<number>('PORT'));
}
bootstrap();
