import { Teacher } from '../../domain/teacher.entity';
import { TeacherDTO } from '../dto/teacher.dto';

/**
 * A Teacher mapper object.
 */
export class TeacherMapper {
  static fromDTOtoEntity(entityDTO: TeacherDTO): Teacher {
    if (!entityDTO) {
      return;
    }
    let entity = new Teacher();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Teacher): TeacherDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new TeacherDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
