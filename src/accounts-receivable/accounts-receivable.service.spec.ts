import { Test, TestingModule } from '@nestjs/testing';
import { AccountsReceivableService } from './accounts-receivable.service';
import { AccountsReceivableModule } from './accounts-receivable.module';

describe('AccountsReceivableService', () => {
  let service: AccountsReceivableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsReceivableModule],
    }).compile();

    service = module.get<AccountsReceivableService>(AccountsReceivableService);

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
  }) 
});



