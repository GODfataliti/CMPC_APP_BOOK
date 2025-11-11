import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { getModelToken } from '@nestjs/sequelize';
import { Author } from '../author.model';

describe('AuthorService', () => {
  let service: AuthorService;

  const mockAuthorModel = {
    findAll: jest.fn().mockResolvedValue([{ name: 'Mock Author' }]),
    findByPk: jest.fn().mockResolvedValue({ name: 'Mock Author' }),
    create: jest.fn().mockResolvedValue({ name: 'Created' }),
    update: jest.fn().mockResolvedValue([1, [{ name: 'Updated' }]]),
    destroy: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        { provide: getModelToken(Author), useValue: mockAuthorModel },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch all authors', async () => {
    const result = await service.getAll();
    expect(result[0].name).toBe('Mock Author');
  });
});
