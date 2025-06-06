import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { StudentModule } from './module/student.module';
import { TeacherModule } from './module/teacher.module';
import { CourseModule } from './module/course.module';
import { TeacherCourseModule } from './module/teacher-course.module';
import { StudentCourseModule } from './module/student-course.module';
import { StudentCourseGradeModule } from './module/student-course-grade.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    AuthModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    TeacherCourseModule,
    StudentCourseModule,
    StudentCourseGradeModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
