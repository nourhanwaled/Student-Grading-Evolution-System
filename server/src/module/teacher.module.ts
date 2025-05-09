import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from '../web/rest/teacher.controller';
import { TeacherRepository } from '../repository/teacher.repository';
import { TeacherService } from '../service/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository])],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
