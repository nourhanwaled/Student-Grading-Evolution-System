import { TeacherCourse } from '../../domain/teacher-course.entity';
import { TeacherCourseDTO } from '../dto/teacher-course.dto';

/**
 * A TeacherCourse mapper object.
 */
export class TeacherCourseMapper {
  static fromDTOtoEntity(entityDTO: TeacherCourseDTO): TeacherCourse {
    if (!entityDTO) {
      return;
    }
    let entity = new TeacherCourse();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: TeacherCourse): TeacherCourseDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new TeacherCourseDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
