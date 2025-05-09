import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TeacherDTO } from '../service/dto/teacher.dto';
import { TeacherMapper } from '../service/mapper/teacher.mapper';
import { TeacherRepository } from '../repository/teacher.repository';

const relationshipNames = [];

@Injectable()
export class TeacherService {
  logger = new Logger('TeacherService');

  constructor(@InjectRepository(TeacherRepository) private teacherRepository: TeacherRepository) {}

  async findById(id: number): Promise<TeacherDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.teacherRepository.findOne(id, options);
    return TeacherMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<TeacherDTO>): Promise<TeacherDTO | undefined> {
    const result = await this.teacherRepository.findOne(options);
    return TeacherMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<TeacherDTO>): Promise<[TeacherDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.teacherRepository.findAndCount(options);
    const teacherDTO: TeacherDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(teacher => teacherDTO.push(TeacherMapper.fromEntityToDTO(teacher)));
      resultList[0] = teacherDTO;
    }
    return resultList;
  }

  async save(teacherDTO: TeacherDTO, creator?: string): Promise<TeacherDTO | undefined> {
    const entity = TeacherMapper.fromDTOtoEntity(teacherDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.teacherRepository.save(entity);
    return TeacherMapper.fromEntityToDTO(result);
  }

  async update(teacherDTO: TeacherDTO, updater?: string): Promise<TeacherDTO | undefined> {
    const entity = TeacherMapper.fromDTOtoEntity(teacherDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.teacherRepository.save(entity);
    return TeacherMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.teacherRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
