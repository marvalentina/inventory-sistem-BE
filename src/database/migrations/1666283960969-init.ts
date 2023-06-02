import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666283960969 implements MigrationInterface {
  name = 'init1666283960969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" DROP COLUMN "quantity"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" ADD "quantity" double precision NOT NULL`,
    );
  }
}
