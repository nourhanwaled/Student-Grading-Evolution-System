import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TeacherCourseDTO } from '../service/dto/teacher-course.dto';
import { TeacherCourseMapper } from '../service/mapper/teacher-course.mapper';
import { TeacherCourseRepository } from '../repository/teacher-course.repository';

const relationshipNames = [];
relationshipNames.push('teacher');
relationshipNames.push('course');

@Injectable()
export class TeacherCourseService {
  logger = new Logger('TeacherCourseService');

  constructor(@InjectRepository(TeacherCourseRepository) private teacherCourseRepository: TeacherCourseRepository) {}

  async findById(id: number): Promise<TeacherCourseDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.teacherCourseRepository.findOne(id, options);
    return TeacherCourseMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<TeacherCourseDTO>): Promise<TeacherCourseDTO | undefined> {
    const result = await this.teacherCourseRepository.findOne(options);
    return TeacherCourseMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<TeacherCourseDTO>): Promise<[TeacherCourseDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.teacherCourseRepository.findAndCount(options);
    const teacherCourseDTO: TeacherCourseDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(teacherCourse => teacherCourseDTO.push(TeacherCourseMapper.fromEntityToDTO(teacherCourse)));
      resultList[0] = teacherCourseDTO;
    }
    return resultList;
  }

  async save(teacherCourseDTO: TeacherCourseDTO, creator?: string): Promise<TeacherCourseDTO | undefined> {
    const entity = TeacherCourseMapper.fromDTOtoEntity(teacherCourseDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.teacherCourseRepository.save(entity);
    return TeacherCourseMapper.fromEntityToDTO(result);
  }

  async update(teacherCourseDTO: TeacherCourseDTO, updater?: string): Promise<TeacherCourseDTO | undefined> {
    const entity = TeacherCourseMapper.fromDTOtoEntity(teacherCourseDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.teacherCourseRepository.save(entity);
    return TeacherCourseMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.teacherCourseRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
