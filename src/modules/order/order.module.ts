import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '@email/services/email.service';
import { InventoryService } from '@inventory/services/inventory.service';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { ItemTypes } from '@item/enums/item-types.enum';
import { ProductReferenceSchema } from '@item/schemas/product-reference.schema';
import { StripePaymentService } from '@stripe/services/stripe-payment.service';
import { TokenModule } from '@token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: ItemTypes.PRODUCT, schema: ProductReferenceSchema },
    ]),
    TokenModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    EmailService,
    InventoryService,
    StripePaymentService,
  ],
  exports: [OrderService],
})
export class OrderModule {}
