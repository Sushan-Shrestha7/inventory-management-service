import { MigrationInterface, QueryRunner } from 'typeorm';

export class ADDDOB1779956003669 implements MigrationInterface {
  name = 'ADDDOB1779956003669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "DOB" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory" ALTER COLUMN "category" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "DOB"`);
  }
}
