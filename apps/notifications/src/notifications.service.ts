import { Injectable } from '@nestjs/common';

import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  public async notifyEmail({ email }: NotifyEmailDto) {
    
  }
}
