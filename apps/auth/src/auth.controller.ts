import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';

import { AUTHENTICATE_EVENT, CurrentUser, UserDocument } from '@app/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);

    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AUTHENTICATE_EVENT)
  public async authenticate(@Payload() data: any) {
    return data.user;
  }
}
