import { sqliteClient } from "../../../common/data/DataLayer";

export const getDogs = async (): Promise<Dog[] | null> => {
  try {
    let result;
    await sqliteClient.db?.transactionAsync(async (tx) => {
      result = await tx.executeSqlAsync(
        "SELECT id, name, foodScoops FROM Dogs"
      );
      result = result.rows;
    });

    return result as unknown as Dog[];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteDog = async (dogID: number): Promise<boolean> => {
  try {
    await sqliteClient.db?.transactionAsync(async (tx) => {
      await tx.executeSqlAsync("DELETE FROM Dogs WHERE id = ?", [dogID]);
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
