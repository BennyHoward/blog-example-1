import { Module } from '@nestjs/common';
import { registerAs, ConfigModule } from '@nestjs/config';
import * as settings from '../../config/app.json';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// TODO: Add the User module to the application

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: './.env',
    ignoreEnvFile: false,
    isGlobal: true, // so it's importation will be implied in all modules
    load: [registerAs('settings', () => settings)],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
