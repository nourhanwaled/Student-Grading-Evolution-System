import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { StudentCourseGradeDTO } from '../src/service/dto/student-course-grade.dto';
import { StudentCourseGradeService } from '../src/service/student-course-grade.service';

describe('StudentCourseGrade Controller', () => {
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
      .overrideProvider(StudentCourseGradeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all student-course-grades ', async () => {
    const getEntities: StudentCourseGradeDTO[] = (await request(app.getHttpServer()).get('/api/student-course-grades').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET student-course-grades by id', async () => {
    const getEntity: StudentCourseGradeDTO = (
      await request(app.getHttpServer())
        .get('/api/student-course-grades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create student-course-grades', async () => {
    const createdEntity: StudentCourseGradeDTO = (
      await request(app.getHttpServer()).post('/api/student-course-grades').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update student-course-grades', async () => {
    const updatedEntity: StudentCourseGradeDTO = (
      await request(app.getHttpServer()).put('/api/student-course-grades').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update student-course-grades from id', async () => {
    const updatedEntity: StudentCourseGradeDTO = (
      await request(app.getHttpServer())
        .put('/api/student-course-grades/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE student-course-grades', async () => {
    const deletedEntity: StudentCourseGradeDTO = (
      await request(app.getHttpServer())
        .delete('/api/student-course-grades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
