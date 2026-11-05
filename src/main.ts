import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { loggerOptions } from '@config/logger.config';
import { setupMiddlewares } from '@config/middlewares.config';
import { MainModule } from './main.module';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    logger: loggerOptions,
    rawBody: true,
  });

  app.set('trust proxy', 'loopback');

  // Arquivos enviados pelo serviço de armazenamento local (substitui o S3).
  const uploadDir = process.env.UPLOAD_DIR ?? 'uploads';
  app.useStaticAssets(join(process.cwd(), uploadDir), {
    prefix: '/uploads/',
  });

  setupMiddlewares(app);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
