import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, UserDocument } from '@app/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
