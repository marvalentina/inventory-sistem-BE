import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666377766039 implements MigrationInterface {
  name = 'init1666377766039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "branch"`);
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "UQ_edf934c4f63d8d34bf5b0cbc66a"`,
    );
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "bill"`);
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "provider"`);
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "provider" character varying(255) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "bill" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "total_price" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "branch" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "branch"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_price"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "bill"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "provider"`);
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "provider" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "bill" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "UQ_edf934c4f63d8d34bf5b0cbc66a" UNIQUE ("bill")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "branch" character varying NOT NULL`,
    );
  }
}
