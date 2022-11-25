import { PgConnection } from '@/infra/database/pg/repos/helpers/connection';
import { IMemoryDb, newDb } from 'pg-mem';

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb();
  db.public.registerFunction({ implementation: () => 'test', name: 'current_database' });
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/repos/postgres/entities/index.ts'],
  });
  await connection.synchronize();
  await PgConnection.getInstance().connect();
  return db;
};
