import { Test, TestingModule } from '@nestjs/testing';
import { AccountsPayableService } from './accounts-payable.service';
import { AccountsPayableModule } from './accounts-payable.module';

describe('AccountsReceivableService', () => {
  let service: AccountsPayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsPayableModule],
    }).compile();

    service = module.get<AccountsPayableService>(AccountsPayableService);

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
