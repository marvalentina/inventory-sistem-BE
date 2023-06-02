import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665777691426 implements MigrationInterface {
    name = 'init1665777691426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "main_inventory" ("id" SERIAL NOT NULL, "quantity" double precision NOT NULL, "total_price" double precision NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "material_id" integer, CONSTRAINT "REL_2c1d226ddefd5fc4bfa32f0e6c" UNIQUE ("material_id"), CONSTRAINT "PK_b4101ecfe31e205ac9417b4f015" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "juncal_inventory" ("id" SERIAL NOT NULL, "quantity" double precision NOT NULL, "total_price" double precision NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "material_id" integer, CONSTRAINT "REL_4b822ab3194eb321f5e206836e" UNIQUE ("material_id"), CONSTRAINT "PK_652f35ce70d977f5f5d594d2e2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "miranda_inventory" ("id" SERIAL NOT NULL, "quantity" double precision NOT NULL, "total_price" double precision NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "material_id" integer, CONSTRAINT "REL_fd26c2f489c39cae1d55d18d47" UNIQUE ("material_id"), CONSTRAINT "PK_86a7408976df7092167c447dd05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_materials" ("id" SERIAL NOT NULL, "quantity" double precision NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "productId" integer, "materialId" integer, CONSTRAINT "PK_660ddd1a3f72389893db90f5e16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "price" double precision NOT NULL, "unit" character varying(40) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_434331663eeb0b1f4475c23205" ON "products" ("price", "name") `);
        await queryRunner.query(`CREATE TABLE "usage" ("id" SERIAL NOT NULL, "quantity" double precision NOT NULL, "branch" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_7bc33e71ab6c3b71eac72950b44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying(100) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "branch" character varying NOT NULL, "quantity" double precision NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "orderId" integer, "materialId" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "price" double precision NOT NULL, "unit" character varying(40) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entries" ("id" SERIAL NOT NULL, "bill" character varying NOT NULL, "provider" character varying(255) NOT NULL, "quantity" double precision NOT NULL, "price" double precision NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "material_id" integer, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usage_products" ("usage_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_b2e2fc89fb5affaae1385c7c07d" PRIMARY KEY ("usage_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b003ed05a17c1550de741a214" ON "usage_products" ("usage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0577abb98b8dac6935577d055b" ON "usage_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "main_inventory" ADD CONSTRAINT "FK_2c1d226ddefd5fc4bfa32f0e6cd" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "juncal_inventory" ADD CONSTRAINT "FK_4b822ab3194eb321f5e206836e6" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "miranda_inventory" ADD CONSTRAINT "FK_fd26c2f489c39cae1d55d18d477" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_materials" ADD CONSTRAINT "FK_a8e64062fa4bc1b02c7d370f2ec" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_materials" ADD CONSTRAINT "FK_ce2eec148df0a0d7886d35b9c5d" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage" ADD CONSTRAINT "FK_91e198d9fab36eceba00b08f2b6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_aac51684cd5ca4490d77a2bd769" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_181075021786a011977cf1876fa" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_products" ADD CONSTRAINT "FK_2b003ed05a17c1550de741a214d" FOREIGN KEY ("usage_id") REFERENCES "usage"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usage_products" ADD CONSTRAINT "FK_0577abb98b8dac6935577d055b3" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_products" DROP CONSTRAINT "FK_0577abb98b8dac6935577d055b3"`);
        await queryRunner.query(`ALTER TABLE "usage_products" DROP CONSTRAINT "FK_2b003ed05a17c1550de741a214d"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_181075021786a011977cf1876fa"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_aac51684cd5ca4490d77a2bd769"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "usage" DROP CONSTRAINT "FK_91e198d9fab36eceba00b08f2b6"`);
        await queryRunner.query(`ALTER TABLE "product_materials" DROP CONSTRAINT "FK_ce2eec148df0a0d7886d35b9c5d"`);
        await queryRunner.query(`ALTER TABLE "product_materials" DROP CONSTRAINT "FK_a8e64062fa4bc1b02c7d370f2ec"`);
        await queryRunner.query(`ALTER TABLE "miranda_inventory" DROP CONSTRAINT "FK_fd26c2f489c39cae1d55d18d477"`);
        await queryRunner.query(`ALTER TABLE "juncal_inventory" DROP CONSTRAINT "FK_4b822ab3194eb321f5e206836e6"`);
        await queryRunner.query(`ALTER TABLE "main_inventory" DROP CONSTRAINT "FK_2c1d226ddefd5fc4bfa32f0e6cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0577abb98b8dac6935577d055b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b003ed05a17c1550de741a214"`);
        await queryRunner.query(`DROP TABLE "usage_products"`);
        await queryRunner.query(`DROP TABLE "entries"`);
        await queryRunner.query(`DROP TABLE "materials"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "usage"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_434331663eeb0b1f4475c23205"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_materials"`);
        await queryRunner.query(`DROP TABLE "miranda_inventory"`);
        await queryRunner.query(`DROP TABLE "juncal_inventory"`);
        await queryRunner.query(`DROP TABLE "main_inventory"`);
    }

}
