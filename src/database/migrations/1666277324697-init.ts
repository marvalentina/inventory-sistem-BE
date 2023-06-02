import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666277324697 implements MigrationInterface {
  name = 'init1666277324697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "main_inventory" DROP COLUMN "total_price"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_434331663eeb0b1f4475c23205"`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "materials" ADD CONSTRAINT "UQ_9b614bb357c5d8741a1a381385c" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "UQ_edf934c4f63d8d34bf5b0cbc66a" UNIQUE ("bill")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_434331663eeb0b1f4475c23205" ON "products" ("price", "name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_434331663eeb0b1f4475c23205"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "UQ_edf934c4f63d8d34bf5b0cbc66a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "materials" DROP CONSTRAINT "UQ_9b614bb357c5d8741a1a381385c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_434331663eeb0b1f4475c23205" ON "products" ("name", "price") `,
    );
    await queryRunner.query(
      `ALTER TABLE "main_inventory" ADD "total_price" double precision NOT NULL`,
    );
  }
}
