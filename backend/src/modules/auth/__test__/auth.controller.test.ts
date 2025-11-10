import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  // 👇 Mock del response de Express
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------------------
  // 🔹 REGISTER
  // -------------------------------------------
  describe('register', () => {
    it('should register a user successfully', async () => {
      const res = mockResponse();
      const dto = { email: 'test@mail.com', password: '1234' };
      const mockUser = { id: '1', email: dto.email };

      mockAuthService.register.mockResolvedValue(mockUser);

      await controller.register(dto as any, res as Response);

      expect(service.register).toHaveBeenCalledWith(dto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: HttpStatus.CREATED,
          message: expect.any(String),
          user: mockUser,
        }),
      );
    });

    it('should handle register errors gracefully', async () => {
      const res = mockResponse();
      const dto = { email: 'fail@mail.com', password: 'bad' };
      const error = new Error('Registration failed');
      mockAuthService.register.mockRejectedValue(error);

      await controller.register(dto as any, res as Response);

      expect(service.register).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        }),
      );
    });
  });

  // -------------------------------------------
  // 🔹 LOGIN
  // -------------------------------------------
  describe('login', () => {
    it('should login successfully and return token and user', async () => {
      const res = mockResponse();
      const dto = { email: 'test@mail.com', password: '1234' };
      const mockResponseData = {
        token: 'jwt-token',
        safeUser: { id: '1', email: dto.email },
      };

      mockAuthService.login.mockResolvedValue(mockResponseData);

      await controller.login(dto as any, res as Response);

      expect(service.login).toHaveBeenCalledWith(dto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: HttpStatus.OK,
          message: expect.any(String),
          token: 'jwt-token',
          user: mockResponseData.safeUser,
        }),
      );
    });

    it('should handle login errors (401)', async () => {
      const res = mockResponse();
      const dto = { email: 'unknown@mail.com', password: 'wrong' };
      const error = new Error('Invalid credentials');
      mockAuthService.login.mockRejectedValue(error);

      await controller.login(dto as any, res as Response);

      expect(service.login).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          status: HttpStatus.UNAUTHORIZED,
          message: error.message,
        }),
      );
    });
  });
});
