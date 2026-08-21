import { Test, TestingModule } from '@nestjs/testing';
import { DadosService } from './dados.service';

describe('DadosService', () => {
  let service: DadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosService],
    }).compile();

    service = module.get<DadosService>(DadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
