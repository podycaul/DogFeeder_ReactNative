import { sqliteClient } from "../../../common/data/DataLayer";

export const saveDog = async ({
  name,
  foodScoops,
}: Dog): Promise<Dog | null> => {
  try {
    let result;
    await sqliteClient.db?.transactionAsync(async (tx) => {
      result = await tx.executeSqlAsync(
        "INSERT INTO Dogs (name, foodScoops) VALUES (?, ?)",
        [name, foodScoops]
      );
      result = result.rows[0];
    });
    return result as unknown as Dog; // this seems....wrong
  } catch (err) {
    console.error(err);
    return null;
  }
};
