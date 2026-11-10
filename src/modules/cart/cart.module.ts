import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductReferenceSchema } from '@item/schemas/product-reference.schema';
import { UserReferenceSchema } from '@shared/schemas/user-reference.schema';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: 'Product', schema: ProductReferenceSchema },
      { name: 'User', schema: UserReferenceSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
