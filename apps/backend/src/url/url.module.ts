import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlService } from './url.service';

@Module({
    imports: [PrismaModule],
    providers: [UrlService, PrismaService],
    exports: [UrlService]
})
export class UrlModule {}
