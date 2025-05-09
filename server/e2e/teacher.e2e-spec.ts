import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TeacherDTO } from '../src/service/dto/teacher.dto';
import { TeacherService } from '../src/service/teacher.service';

describe('Teacher Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(TeacherService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all teachers ', async () => {
    const getEntities: TeacherDTO[] = (await request(app.getHttpServer()).get('/api/teachers').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET teachers by id', async () => {
    const getEntity: TeacherDTO = (
      await request(app.getHttpServer())
        .get('/api/teachers/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create teachers', async () => {
    const createdEntity: TeacherDTO = (await request(app.getHttpServer()).post('/api/teachers').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update teachers', async () => {
    const updatedEntity: TeacherDTO = (await request(app.getHttpServer()).put('/api/teachers').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update teachers from id', async () => {
    const updatedEntity: TeacherDTO = (
      await request(app.getHttpServer())
        .put('/api/teachers/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE teachers', async () => {
    const deletedEntity: TeacherDTO = (
      await request(app.getHttpServer())
        .delete('/api/teachers/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
