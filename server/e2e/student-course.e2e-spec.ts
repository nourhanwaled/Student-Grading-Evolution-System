import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { StudentCourseDTO } from '../src/service/dto/student-course.dto';
import { StudentCourseService } from '../src/service/student-course.service';

describe('StudentCourse Controller', () => {
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
      .overrideProvider(StudentCourseService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all student-courses ', async () => {
    const getEntities: StudentCourseDTO[] = (await request(app.getHttpServer()).get('/api/student-courses').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET student-courses by id', async () => {
    const getEntity: StudentCourseDTO = (
      await request(app.getHttpServer())
        .get('/api/student-courses/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create student-courses', async () => {
    const createdEntity: StudentCourseDTO = (await request(app.getHttpServer()).post('/api/student-courses').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update student-courses', async () => {
    const updatedEntity: StudentCourseDTO = (await request(app.getHttpServer()).put('/api/student-courses').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update student-courses from id', async () => {
    const updatedEntity: StudentCourseDTO = (
      await request(app.getHttpServer())
        .put('/api/student-courses/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE student-courses', async () => {
    const deletedEntity: StudentCourseDTO = (
      await request(app.getHttpServer())
        .delete('/api/student-courses/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
