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
});
