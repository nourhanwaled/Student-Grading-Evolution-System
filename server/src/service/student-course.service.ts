import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { StudentCourseDTO } from '../service/dto/student-course.dto';
import { StudentCourseMapper } from '../service/mapper/student-course.mapper';
import { StudentCourseRepository } from '../repository/student-course.repository';

const relationshipNames = [];
relationshipNames.push('student');
relationshipNames.push('course');

@Injectable()
export class StudentCourseService {
  logger = new Logger('StudentCourseService');

  constructor(@InjectRepository(StudentCourseRepository) private studentCourseRepository: StudentCourseRepository) {}

  async findById(id: number): Promise<StudentCourseDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.studentCourseRepository.findOne(id, options);
    return StudentCourseMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<StudentCourseDTO>): Promise<StudentCourseDTO | undefined> {
    const result = await this.studentCourseRepository.findOne(options);
    return StudentCourseMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<StudentCourseDTO>): Promise<[StudentCourseDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.studentCourseRepository.findAndCount(options);
    const studentCourseDTO: StudentCourseDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(studentCourse => studentCourseDTO.push(StudentCourseMapper.fromEntityToDTO(studentCourse)));
      resultList[0] = studentCourseDTO;
    }
    return resultList;
  }

  async save(studentCourseDTO: StudentCourseDTO, creator?: string): Promise<StudentCourseDTO | undefined> {
    const entity = StudentCourseMapper.fromDTOtoEntity(studentCourseDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.studentCourseRepository.save(entity);
    return StudentCourseMapper.fromEntityToDTO(result);
  }

  async update(studentCourseDTO: StudentCourseDTO, updater?: string): Promise<StudentCourseDTO | undefined> {
    const entity = StudentCourseMapper.fromDTOtoEntity(studentCourseDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.studentCourseRepository.save(entity);
    return StudentCourseMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.studentCourseRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
