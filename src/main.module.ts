import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from '@config/mongo.config';
import redisStore from 'cache-manager-redis-store';
import { HealthModule } from '@health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@product/product.module';
import { CartModule } from '@cart/cart.module';
import { StripeModule } from '@stripe/stripe.module';
import { CacheModule } from '@nestjs/cache-manager';
import { OrderModule } from '@order/order.module';
import { ThrottlerModule } from '@nestjs/throttler';

/**
 * Monólito restante no snapshot-1 da trilha de Subdomínio.
 *
 * Saíram os subdomínios genéricos: Identidade (auth, token, user, address) e
 * Comunicação (email). Permanecem o suporte (product, search, storages), o
 * núcleo (cart, shipping, order, inventory, stripe) e o health.
 */
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
    ProductModule,
    CartModule,
    StripeModule,
    OrderModule,
  ],
})
export class MainModule {}
