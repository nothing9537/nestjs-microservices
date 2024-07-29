import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly usersService: UsersService
  ) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string) {
    try {
      return await this.usersService.validateUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}