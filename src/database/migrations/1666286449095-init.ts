import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666286449095 implements MigrationInterface {
  name = 'init1666286449095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" RENAME COLUMN "total_price" TO "quantity"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" RENAME COLUMN "quantity" TO "total_price"`,
    );
  }
}
