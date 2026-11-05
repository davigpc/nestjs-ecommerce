import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchService } from '@search/services/search.service';
import { LocalStorageService } from '@storages/services/local-storage.service';
import { Offering, OfferingSchema } from './schemas/offering.schema';
import { OfferingController } from './controllers/offering.controller';
import { OfferingService } from './services/offering.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offering.name, schema: OfferingSchema },
    ]),
  ],
  controllers: [OfferingController],
  providers: [OfferingService, SearchService, LocalStorageService],
  exports: [OfferingService],
})
export class OfferingModule {}
