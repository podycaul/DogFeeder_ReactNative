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
