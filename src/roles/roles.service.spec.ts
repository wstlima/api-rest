import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesModule } from './roles.module';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesModule],
    }).compile();

    service = module.get<RolesService>(RolesService);

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
  }) 
});
