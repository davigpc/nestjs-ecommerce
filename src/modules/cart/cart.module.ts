import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemTypes } from '@item/enums/item-types.enum';
import { ProductReferenceSchema } from '@item/schemas/product-reference.schema';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: ItemTypes.PRODUCT, schema: ProductReferenceSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
