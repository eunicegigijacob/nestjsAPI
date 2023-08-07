import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(`Origin ${origin} is being granted CORS access`);
      callback(null, true);
    },
  });
  await app.listen(3000);
}
bootstrap();
