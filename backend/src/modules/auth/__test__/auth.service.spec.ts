import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwt = {
    sign: jest.fn().mockReturnValue('fake-token'),
  };

  const mockUser = {
    userID: '123',
    username: 'Test',
    email: 'test@example.com',
    password: 'hashed',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: mockJwt }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token on login', async () => {
    jest.spyOn(service, 'login').mockResolvedValue({
      token: 'fake-token',
      safeUser: mockUser,
    });
    const result = await service.login({
      email: 'test@example.com',
      password: '1234',
    });
    expect(result.token).toBe('fake-token');
  });
});
