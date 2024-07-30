import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CREATE_CHARGE_EVENT, PAYMENTS_SERVICE, UserDto } from '@app/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {

  }

  public async create(createReservationDto: CreateReservationDto, { email, _id: userId }: UserDto) {
    return this.paymentsService
      .send(CREATE_CHARGE_EVENT, { ...createReservationDto.charge, email })
      .pipe(
        map(async (res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        })
      );
  }

  public async findAll() {
    return this.reservationsRepository.find({});
  }

  public async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  public async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  public async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
