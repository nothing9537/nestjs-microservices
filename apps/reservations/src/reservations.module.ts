import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';

import { AUTH_SERVICE, DatabaseModule, LoggerModule, PAYMENTS_SERVICE } from '@app/common';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsDocument, ReservationsSchema } from './models/reservations.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: ReservationsDocument.name, schema: ReservationsSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),

        AUTH_HOST: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),

        AUTH_HOST_PORT: Joi.number().required(),
        PAYMENTS_HOST_PORT: Joi.number().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: AUTH_SERVICE,
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_HOST'),
            port: +configService.get<number>('AUTH_HOST_PORT'),
          },
        })
      },
      {
        name: PAYMENTS_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: PAYMENTS_SERVICE,
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('PAYMENTS_HOST'),
            port: +configService.get<number>('PAYMENTS_HOST_PORT'),
          },
        })
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule { }
