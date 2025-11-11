import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { before, after, describe, it } from 'node:test';

describe('📘 CMPC Books API (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let token = '';

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('BookModel')
      .useValue({
        findAll: jest.fn().mockResolvedValue([{ title: 'Mock Book' }]),
        findByPk: jest.fn().mockResolvedValue({ title: 'Mock Book' }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    server = app.getHttpServer();
  });

  after(async () => {
    await app.close();
  });

  // ✅ 1. Test básico de /auth/login
  it('/auth/login (POST) - should return token', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '123456' })
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // ✅ 2. Test de /book/all
  it('/book/all (GET) - should return books', async () => {
    const response = await request(server)
      .get('/book/all')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe(200);
    expect(response.body.books).toBeInstanceOf(Array);
  });

  // ✅ 3. Test de búsqueda con query params
  it('/book/search (GET) - should support query filters', async () => {
    const response = await request(server)
      .get('/book/search')
      .query({ general: 'Mock' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe(200);
    expect(Array.isArray(response.body.books)).toBeTruthy();
  });

  // ✅ 4. Test error handling - unauthorized
  it('/book/all (GET) - should fail without token', async () => {
    const res = await request(server).get('/book/all').expect(401);
    expect(res.body.message).toMatch(/token/i);
  });
});
