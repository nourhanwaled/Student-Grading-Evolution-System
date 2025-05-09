import { StudentCourse } from '../../domain/student-course.entity';
import { StudentCourseDTO } from '../dto/student-course.dto';

/**
 * A StudentCourse mapper object.
 */
export class StudentCourseMapper {
  static fromDTOtoEntity(entityDTO: StudentCourseDTO): StudentCourse {
    if (!entityDTO) {
      return;
    }
    let entity = new StudentCourse();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: StudentCourse): StudentCourseDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new StudentCourseDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
