import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrice1779872487909 implements MigrationInterface {
  name = 'AddPrice1779872487909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory" RENAME COLUMN "price" TO "category"`,
    );
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "category"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "category" character varying  NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "inventory" ADD "category" integer`);
    await queryRunner.query(
      `ALTER TABLE "inventory" RENAME COLUMN "category" TO "price"`,
    );
  }
}
