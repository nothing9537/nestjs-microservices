import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  public async createUser(createUserDto: CreateUserDto) {
    await this.validateUserDto(createUserDto);

    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateUserDto({ email }: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }

  public async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials not valid.');
    }

    return user;
  }

  public async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
