import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TeacherCourseDTO } from '../src/service/dto/teacher-course.dto';
import { TeacherCourseService } from '../src/service/teacher-course.service';

describe('TeacherCourse Controller', () => {
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
      .overrideProvider(TeacherCourseService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all teacher-courses ', async () => {
    const getEntities: TeacherCourseDTO[] = (await request(app.getHttpServer()).get('/api/teacher-courses').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET teacher-courses by id', async () => {
    const getEntity: TeacherCourseDTO = (
      await request(app.getHttpServer())
        .get('/api/teacher-courses/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create teacher-courses', async () => {
    const createdEntity: TeacherCourseDTO = (await request(app.getHttpServer()).post('/api/teacher-courses').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update teacher-courses', async () => {
    const updatedEntity: TeacherCourseDTO = (await request(app.getHttpServer()).put('/api/teacher-courses').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update teacher-courses from id', async () => {
    const updatedEntity: TeacherCourseDTO = (
      await request(app.getHttpServer())
        .put('/api/teacher-courses/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE teacher-courses', async () => {
    const deletedEntity: TeacherCourseDTO = (
      await request(app.getHttpServer())
        .delete('/api/teacher-courses/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
