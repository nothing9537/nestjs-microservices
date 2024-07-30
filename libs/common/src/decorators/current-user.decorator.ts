import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models';

function getCurrentUserByContext(context: ExecutionContext): UserDocument {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
);