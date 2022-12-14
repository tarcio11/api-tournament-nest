import { AppModule } from '@/main/factories';
import { PgChallengeEntity, PgUserEntity } from '@/infra/database/pg/entities';
import { PgConnection } from '@/infra/database/pg/repos/helpers';
import { makeFakeDb } from '@/test/mocks/setup-db';
import { mockUserInput } from '@/test/mocks';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { IBackup } from 'pg-mem';
import * as request from 'supertest';
import MockDate from 'mockdate';

describe('/users', () => {
  let app: INestApplication;
  let connection: PgConnection;
  let backup: IBackup;

  beforeAll(async () => {
    MockDate.set(new Date());
    connection = PgConnection.getInstance();
    const db = await makeFakeDb([PgUserEntity, PgChallengeEntity]);
    backup = db.backup();
  });

  beforeEach(async () => {
    backup.restore();
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    MockDate.reset();
    await connection.disconnect();
  });

  describe('POST', () => {
    it('/api/v1/users', async () => {
      const { status } = await request(app.getHttpServer()).post('/users').send(mockUserInput());

      expect(status).toBe(201);
    });

    it('/api/v1/users/signin', async () => {
      await request(app.getHttpServer()).post('/users').send(mockUserInput());
      const { status, body } = await request(app.getHttpServer())
        .post('/users/signin')
        .send({ email: 'any_email@mail.com', password: 'any_password' });

      expect(status).toBe(200);
      expect(body.accessToken).toBeTruthy();
    });
  });

  describe('GET', () => {
    it('/api/v1/users', async () => {
      await request(app.getHttpServer()).post('/users').send(mockUserInput());
      const { body: userLogged } = await request(app.getHttpServer())
        .post('/users/signin')
        .send({ email: 'any_email@mail.com', password: 'any_password' });

      const { status, body } = await request(app.getHttpServer())
        .get('/users')
        .set({ Authorization: `Bearer ${userLogged.accessToken}` });
      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });

    it('/api/v1/users/me', async () => {
      const { body: newUser } = await request(app.getHttpServer()).post('/users').send(mockUserInput());
      const { body: userLogged } = await request(app.getHttpServer())
        .post('/users/signin')
        .send({ email: 'any_email@mail.com', password: 'any_password' });

      const { status, body } = await request(app.getHttpServer())
        .get('/users/me')
        .set({ Authorization: `Bearer ${userLogged.accessToken}` });
      expect(status).toBe(200);
      expect(body.id).toBe(newUser.id);
    });
  });
});
