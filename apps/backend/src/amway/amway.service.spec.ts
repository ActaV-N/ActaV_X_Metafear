import { Test, TestingModule } from '@nestjs/testing';
import { AmwayService } from './amway.service';

describe('AmwayService', () => {
  let service: AmwayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmwayService],
    }).compile();

    service = module.get<AmwayService>(AmwayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  describe("Test product crawling", () => {
    let brand: string;

    it('should have crawlProductByBrand function', () => {
      expect(typeof service.crawlProductByBrand).toBe('function');
    });
    
    it('should get nutrilite product data', async () => {
      brand = 'nutrilite';
      const data = await service.crawlProductByBrand(brand);
      console.log(data);
    }, 60000);

    it('should get artistry product data', async () => {
      brand = 'artistry';
      const data = await service.crawlProductByBrand(brand);
      console.log(data);
    }, 60000)
  });

  
});
