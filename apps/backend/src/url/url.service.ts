import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Url } from '@prisma/client';

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService){}

    /**
     * getURL Information by brandName
     * @param brandNameWhereUniqueInput 
     * @returns Url
     */
    async getURLByBrandName(brandNameWhereUniqueInput: Prisma.UrlWhereUniqueInput): Promise<Url | null>{
        return this.prisma.url.findUnique({
            where: brandNameWhereUniqueInput
        })
    }

    /**
     * update URL information by brandName
     * @param params 
     * @returns Url
     */
    async setURLByBrandName(params: {
        where: Prisma.UrlWhereUniqueInput,
        data: Prisma.UrlUpdateInput
    }): Promise<Url | null>{
      const {where, data} = params;  
      
      return this.prisma.url.update({
        where:where,
        data:data
      });
    }

    /**
     * create URL information
     * @param data 
     * @returns Url
     */
    async createURL(data: Prisma.UrlCreateInput):Promise<Url | null> {
      return this.prisma.url.create({
        data: data
      });
    }
}
