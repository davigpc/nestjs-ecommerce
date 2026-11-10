import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@product/product.module';
import { InventoryService } from '@inventory/services/inventory.service';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { UserReferenceSchema } from '@shared/schemas/user-reference.schema';
import { AccessTokenModule } from '@shared/guards/access-token.module';
import { StripePaymentService } from '@stripe/services/stripe-payment.service';
import { ComunicacaoClient } from './services/comunicacao.client';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: 'User', schema: UserReferenceSchema },
    ]),
    AccessTokenModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    InventoryService,
    StripePaymentService,
    ComunicacaoClient,
  ],
  exports: [OrderService],
})
export class OrderModule {}
