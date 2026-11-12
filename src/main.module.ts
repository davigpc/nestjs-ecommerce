import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from '@config/mongo.config';
import redisStore from 'cache-manager-redis-store';
import { HealthModule } from '@health/health.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { TokenModule } from '@token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '@email/email.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AddressModule } from '@address/address.module';
import { InternalModule } from '@internal/internal.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoConfig,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    HealthModule,
    UserModule,
    AddressModule,
    AuthModule,
    TokenModule,
    EmailModule,
    InternalModule,
  ],
})
export class MainModule {}




