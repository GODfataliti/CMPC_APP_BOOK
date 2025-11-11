import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from '../book.model';

describe('BookService', () => {
  let service: BookService;

  const mockBookModel = {
    findAll: jest.fn().mockResolvedValue([{ bookID: '1', title: 'Mock Book' }]),
    findByPk: jest.fn().mockResolvedValue({ bookID: '1', title: 'Mock Book' }),
    create: jest.fn().mockResolvedValue({ bookID: '1', title: 'Created' }),
    update: jest
      .fn()
      .mockResolvedValue([1, [{ bookID: '1', title: 'Updated' }]]),
    destroy: jest.fn().mockResolvedValue(1),
    count: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken(Book), useValue: mockBookModel },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    const result = await service.getAllBooks();
    expect(result[0].title).toBe('Mock Book');
  });

  it('should return a single book by ID', async () => {
    const result = await service.getBookById('1');
    expect(result?.title).toBe('Mock Book');
  });

  // it('should create a book', async () => {
  //   const result = await service.createBook({ title: 'Created' } as any);
  //   expect(result.title).toBe('Created');
  // });

  // it('should update a book', async () => {
  //   const result = await service.updateBook('1', { title: 'Updated' } as any);
  //   expect(result.title).toBe('Updated');
  // });

  // it('should delete a book', async () => {
  //   await expect(service.deleteBook('1')).resolves.not.toThrow();
  // });
});
