import { Test, TestingModule } from '@nestjs/testing';
import { DefaultConfigOptionsService } from './default-config-options.service';

describe('DefaultConfigOptionsService', () => {
  let service: DefaultConfigOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultConfigOptionsService],
    }).compile();

    service = module.get<DefaultConfigOptionsService>(DefaultConfigOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
