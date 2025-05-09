import { StudentCourseGrade } from '../../domain/student-course-grade.entity';
import { StudentCourseGradeDTO } from '../dto/student-course-grade.dto';

/**
 * A StudentCourseGrade mapper object.
 */
export class StudentCourseGradeMapper {
  static fromDTOtoEntity(entityDTO: StudentCourseGradeDTO): StudentCourseGrade {
    if (!entityDTO) {
      return;
    }
    let entity = new StudentCourseGrade();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: StudentCourseGrade): StudentCourseGradeDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new StudentCourseGradeDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
