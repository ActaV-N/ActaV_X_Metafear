import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmwayModule } from './amway/amway.module';
import { UrlService } from './url/url.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [AmwayModule, PrismaModule, UrlModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UrlService]
})
export class AppModule {}
