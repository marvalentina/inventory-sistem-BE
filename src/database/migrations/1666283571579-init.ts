import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666283571579 implements MigrationInterface {
  name = 'init1666283571579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" ADD "total_price" double precision NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" DROP COLUMN "total_price"`,
    );
  }
}
