import { Test, TestingModule } from '@nestjs/testing';
import { InitiateController } from './initiate.controller';
import { InitiateService } from './initiate.service';

describe('InitiateController', () => {
  let controller: InitiateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitiateController],
      providers: [InitiateService],
    }).compile();

    controller = module.get<InitiateController>(InitiateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
