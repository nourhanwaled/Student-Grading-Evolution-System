import { Authority } from '../domain/authority.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUserRoles1734006882878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(queryRunner.manager.create<Authority>(Authority, { name: 'ROLE_USER' }));
    await queryRunner.manager.save(queryRunner.manager.create<Authority>(Authority, { name: 'ROLE_ADMIN' }));
    await queryRunner.manager.save(queryRunner.manager.create<Authority>(Authority, { name: 'ROLE_ANONYMOUS' }));
    await queryRunner.manager.save(queryRunner.manager.create<Authority>(Authority, { name: 'ROLE_TEACHER' }));
    await queryRunner.manager.save(queryRunner.manager.create<Authority>(Authority, { name: 'ROLE_STUDENT' }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
