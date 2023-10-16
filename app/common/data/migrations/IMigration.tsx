import * as SQLite from "expo-sqlite";

type Migration = (db: SQLite.SQLTransactionAsync) => Promise<void>;

export default Migration;
