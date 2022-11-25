import {
  createConnection,
  getConnection,
  getConnectionManager,
  ObjectType,
  QueryRunner,
  Repository,
  Connection,
  getRepository,
  ObjectLiteral,
} from 'typeorm';

export class PgConnection {
  private static instance?: PgConnection;
  private query?: QueryRunner;
  private connection?: Connection;

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection();
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new Error();
    await getConnection().close();
    this.query = undefined;
    this.connection = undefined;
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined) throw new Error();
    this.query = this.connection.createQueryRunner();
    await this.query.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) throw new Error();
    await this.query.release();
  }

  async commit(): Promise<void> {
    if (this.query === undefined) throw new Error();
    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) throw new Error();
    await this.query.rollbackTransaction();
  }

  getRepository<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new Error();
    if (this.query !== undefined) return this.query.manager.getRepository(entity);
    return getRepository(entity);
  }
}
