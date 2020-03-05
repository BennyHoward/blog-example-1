// import { Request } from 'express';
import { Controller, Get/* , Req */ } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('/')
  public findAll(/* @Req() _request: Request */): string {
    return 'This action returns all users';
  }
}
