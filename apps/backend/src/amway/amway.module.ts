import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlModule } from 'src/url/url.module';
import { UrlService } from 'src/url/url.service';
import { AmwayService } from './amway.service';

@Module({
  imports: [UrlModule, PrismaModule],
  providers: [AmwayService, UrlService, PrismaService]
})
export class AmwayModule {}
