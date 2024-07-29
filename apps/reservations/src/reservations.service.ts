import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(readonly reservationsRepository: ReservationsRepository) {

  }

  public create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  public findAll() {
    return this.reservationsRepository.find({});
  }

  public findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  public update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  public remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
