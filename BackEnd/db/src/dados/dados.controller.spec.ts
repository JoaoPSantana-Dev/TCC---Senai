import { Test, TestingModule } from '@nestjs/testing';
import { DadosController } from './dados.controller';
import { DadosService } from './dados.service';

describe('DadosController', () => {
  let controller: DadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosController],
      providers: [DadosService],
    }).compile();

    controller = module.get<DadosController>(DadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
