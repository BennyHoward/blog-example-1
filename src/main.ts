import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getHttpsOptions } from './helpers';
import { AppModule } from './app/app.module';

(async (): Promise<void> => {
  // NOTE: Ensure that you generate the SSL certs with the following command: `generate-ssl-certs` prior to running this application.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {httpsOptions: await getHttpsOptions()});

  const configService: ConfigService = app.get<ConfigService, ConfigService>(ConfigService);
  const APP_HOST: string = configService.get<string>('APP_HOST') || 'localhost';
  const APP_PORT: string | number = configService.get<string>('APP_PORT') || 3000;

  app.useStaticAssets('./assets');
  app.setBaseViewsDir([
    // Accommodate the views for the App module
    './src/app/views',
    // Accommodate the views for the User module
    './src/user/views',
    // NOTE: As you create more module please follow this convention and add a views directory here as needed.
  ]);
  // Using Handlebars as the template engine as suggested in NestJS documentation
  app.setViewEngine('hbs');

  await app.listen(APP_PORT, () => console.log(`Application running on URL: https://${APP_HOST}:${APP_PORT}/`));
})();
