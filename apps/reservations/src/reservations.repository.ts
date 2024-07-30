import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ReservationsDocument } from './models/reservations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  protected readonly logger: Logger = new Logger(ReservationsRepository.name);

  constructor(@InjectModel(ReservationsDocument.name) reservationModel: Model<ReservationsDocument>) {
    super(reservationModel);
  }
}