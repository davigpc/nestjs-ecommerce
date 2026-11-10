import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from '@config/mongo.config';
import redisStore from 'cache-manager-redis-store';
import { HealthModule } from '@health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from '@cart/cart.module';
import { StripeModule } from '@stripe/stripe.module';
import { CacheModule } from '@nestjs/cache-manager';
import { OrderModule } from '@order/order.module';
import { ThrottlerModule } from '@nestjs/throttler';

/**
 * Monólito restante no snapshot-2 da trilha de Subdomínio.
 *
 * Saíram os genéricos (Identidade e Comunicação) e o suporte (Catálogo). Ficou
 * apenas o núcleo: carrinho, frete, pedido, estoque e pagamento.
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
    CartModule,
    StripeModule,
    OrderModule,
  ],
})
export class MainModule {}
