import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Matches1670114450111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matches',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'challenge_id',
            type: 'uuid',
          },
          {
            name: 'playWinner_id',
            type: 'uuid',
          },
          {
            name: 'playLoser_id',
            type: 'uuid',
          },
          {
            name: 'scoreWinner',
            type: 'integer',
          },
          {
            name: 'scoreLoser',
            type: 'integer',
          },
          {
            name: 'draw',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matches');
  }
}
