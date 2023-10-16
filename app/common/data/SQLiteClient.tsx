import * as SQLite from "expo-sqlite";
import Migration from "./migrations/IMigration";

export class MigrationError extends Error {
  constructor() {
    super();
    this.name = "MigrationError";
  }
}

export default class SQLiteClient {
  private _connected: boolean = false;
  private _name: string;
  private _migrations: Migration[];
  private _db: SQLite.SQLiteDatabase | null = null;

  constructor(name: string, migrations: Migration[]) {
    this._name = name;
    this._migrations = migrations;
  }

  public get connected(): boolean {
    return this._connected;
  }

  public get db(): SQLite.SQLiteDatabase | null {
    return this._db;
  }

  public async connect(): Promise<void> {
    if (this._connected) return;

    try {
      this._db = SQLite.openDatabase(this._name);

      // handle migrations
      await this._db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync("PRAGMA user_version");

        const version: number = result.rows[0].user_version;
        const nextVersion = this._migrations.length;
        if (version > nextVersion) throw new MigrationError();

        for (let i = version; i < nextVersion; i += 1) {
          const migration = this._migrations[i];
          await migration(tx);
        }

        if (version !== nextVersion) {
          await tx.executeSqlAsync(`PRAGMA user_version = ${nextVersion}`);
        }
      });

      this._connected = true;
    } catch (err) {
      console.error(err);
      if (err instanceof MigrationError) throw err;

      throw new Error(
        `SQLiteClient: failed to connect to database: ${this._name}`
      );
    }
  }
}
