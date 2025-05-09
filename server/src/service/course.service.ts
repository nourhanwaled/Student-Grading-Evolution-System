import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CourseDTO } from '../service/dto/course.dto';
import { CourseMapper } from '../service/mapper/course.mapper';
import { CourseRepository } from '../repository/course.repository';

const relationshipNames = [];

@Injectable()
export class CourseService {
  logger = new Logger('CourseService');

  constructor(@InjectRepository(CourseRepository) private courseRepository: CourseRepository) {}

  async findById(id: number): Promise<CourseDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.courseRepository.findOne(id, options);
    return CourseMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<CourseDTO>): Promise<CourseDTO | undefined> {
    const result = await this.courseRepository.findOne(options);
    return CourseMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CourseDTO>): Promise<[CourseDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.courseRepository.findAndCount(options);
    const courseDTO: CourseDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(course => courseDTO.push(CourseMapper.fromEntityToDTO(course)));
      resultList[0] = courseDTO;
    }
    return resultList;
  }

  async save(courseDTO: CourseDTO, creator?: string): Promise<CourseDTO | undefined> {
    const entity = CourseMapper.fromDTOtoEntity(courseDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.courseRepository.save(entity);
    return CourseMapper.fromEntityToDTO(result);
  }

  async update(courseDTO: CourseDTO, updater?: string): Promise<CourseDTO | undefined> {
    const entity = CourseMapper.fromDTOtoEntity(courseDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.courseRepository.save(entity);
    return CourseMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.courseRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
