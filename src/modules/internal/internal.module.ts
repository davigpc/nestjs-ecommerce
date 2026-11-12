import { Module } from '@nestjs/common';
import { EmailModule } from '@email/email.module';
import { UserModule } from '@user/user.module';
import { InternalController } from './internal.controller';

@Module({
  imports: [EmailModule, UserModule],
  controllers: [InternalController],
})
export class InternalModule {}
