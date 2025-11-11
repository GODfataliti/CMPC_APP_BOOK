import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from '../log.service';
import { getModelToken } from '@nestjs/sequelize';
import { Log } from '../log.model';

describe('LogService', () => {
  let service: LogService;

  const mockLogModel = {
    create: jest.fn().mockResolvedValue({ action: 'CREATE', entity: 'book' }),
    findAll: jest
      .fn()
      .mockResolvedValue([{ action: 'CREATE', entity: 'book' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogService,
        { provide: getModelToken(Log), useValue: mockLogModel },
      ],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a log entry', async () => {
  //   const result = await service.create('user1', 'CREATE', 'book', 'book1');
  //   expect(result.action).toBe('CREATE');
  // });
});
