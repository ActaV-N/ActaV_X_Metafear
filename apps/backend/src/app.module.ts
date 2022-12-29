import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmwayModule } from './amway/amway.module';

@Module({
  imports: [AmwayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
