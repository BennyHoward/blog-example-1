import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('/')
  @Render('index') // the view to use `index.hbs in this case`
  public index() {
    console.log(this.appService, this.configService.get<string>('APP_PORT'));
    return { message: 'Hello world!' };
  }

  @Get('/hello')
  public getHello(): string {
    return this.appService.getHello();
  }
}
