import SQLiteClient from "./SQLiteClient";
import DogRegistration__1 from "./migrations/DogRegistration__1";

const MIGRATIONS = [DogRegistration__1];

export const sqliteClient = new SQLiteClient("db.dog_feeder", MIGRATIONS);

export const initialize = async (): Promise<void> => {
  await sqliteClient.connect();
};
