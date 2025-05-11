import { Test, TestingModule } from '@nestjs/testing';
import { DbManageService } from './db-manage.service';

describe('DbManageService', () => {
  let service: DbManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbManageService],
    }).compile();

    service = module.get<DbManageService>(DbManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
