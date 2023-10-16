import * as SQLite from "expo-sqlite";
import IMigration from "./IMigration";

const DogRegistration__1: IMigration = async (
  tx: SQLite.SQLTransactionAsync
) => {
  await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS Dogs(
        name TEXT NOT NULL,
        foodScoops NUMERIC NOT NULL
    );`);
};

export default DogRegistration__1;
