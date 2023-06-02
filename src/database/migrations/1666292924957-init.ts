import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666292924957 implements MigrationInterface {
  name = 'init1666292924957';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "juncal_inventory" DROP COLUMN "total_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miranda_inventory" DROP COLUMN "total_price"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miranda_inventory" ADD "total_price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "juncal_inventory" ADD "total_price" double precision NOT NULL`,
    );
  }
}
