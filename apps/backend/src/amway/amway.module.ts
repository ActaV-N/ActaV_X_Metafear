import { Module } from '@nestjs/common';
import { AmwayService } from './amway.service';

@Module({
  providers: [AmwayService]
})
export class AmwayModule {}
