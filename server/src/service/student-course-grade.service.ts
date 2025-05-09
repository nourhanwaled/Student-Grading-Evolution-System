import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { StudentCourseGradeDTO } from '../service/dto/student-course-grade.dto';
import { StudentCourseGradeMapper } from '../service/mapper/student-course-grade.mapper';
import { StudentCourseGradeRepository } from '../repository/student-course-grade.repository';

const relationshipNames = [];
relationshipNames.push('student');
relationshipNames.push('course');

@Injectable()
export class StudentCourseGradeService {
  logger = new Logger('StudentCourseGradeService');

  constructor(@InjectRepository(StudentCourseGradeRepository) private studentCourseGradeRepository: StudentCourseGradeRepository) {}

  async findById(id: number): Promise<StudentCourseGradeDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.studentCourseGradeRepository.findOne(id, options);
    return StudentCourseGradeMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<StudentCourseGradeDTO>): Promise<StudentCourseGradeDTO | undefined> {
    const result = await this.studentCourseGradeRepository.findOne(options);
    return StudentCourseGradeMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<StudentCourseGradeDTO>): Promise<[StudentCourseGradeDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.studentCourseGradeRepository.findAndCount(options);
    const studentCourseGradeDTO: StudentCourseGradeDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(studentCourseGrade => studentCourseGradeDTO.push(StudentCourseGradeMapper.fromEntityToDTO(studentCourseGrade)));
      resultList[0] = studentCourseGradeDTO;
    }
    return resultList;
  }

  async save(studentCourseGradeDTO: StudentCourseGradeDTO, creator?: string): Promise<StudentCourseGradeDTO | undefined> {
    const entity = StudentCourseGradeMapper.fromDTOtoEntity(studentCourseGradeDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.studentCourseGradeRepository.save(entity);
    return StudentCourseGradeMapper.fromEntityToDTO(result);
  }

  async update(studentCourseGradeDTO: StudentCourseGradeDTO, updater?: string): Promise<StudentCourseGradeDTO | undefined> {
    const entity = StudentCourseGradeMapper.fromDTOtoEntity(studentCourseGradeDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.studentCourseGradeRepository.save(entity);
    return StudentCourseGradeMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.studentCourseGradeRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
