import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlModule } from 'src/url/url.module';
import { UrlService } from 'src/url/url.service';
import { AmwayService } from './amway.service';

describe('AmwayService', () => {
  let amwayService: AmwayService;
  let urlService: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[UrlModule, PrismaModule],
      providers: [AmwayService, UrlService, PrismaService],
    }).compile();

    amwayService = module.get<AmwayService>(AmwayService);
    urlService = module.get<UrlService>(UrlService);
  });

  describe('all services should be defined', () => {
    it('amway service should be defined', () => {
      expect(amwayService).toBeDefined();
    });
  
    it('url service should be defined', () => {
      expect(urlService).toBeDefined();
    })
  });

  describe("test setProductUrlScheduler", () => {
    it('should be defined', () => {
      expect(amwayService.setProductUrlScheduler).toBeDefined();
    });

    it('should return true', () => {
      expect(amwayService.setProductUrlScheduler()).toBeTruthy();
    })
  });
  
  describe("Test product crawling", () => {
    let brand: string;

    it('should have crawlProductByBrand function', () => {
      expect(typeof amwayService.crawlProductByBrand).toBe('function');
    });

    it('should get nutrilite product data', async () => {
      brand = 'nutrilite';
      const data = await amwayService.crawlProductByBrand(brand);
      console.log(data);
    }, 300000);

    it('should get artistry product data', async () => {
      brand = 'artistry';
      const data = await amwayService.crawlProductByBrand(brand);
      console.log(data);
    }, 300000)
  });
});
