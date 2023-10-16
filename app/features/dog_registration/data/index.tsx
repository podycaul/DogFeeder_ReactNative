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

export const getDog = async (dogID: number): Promise<Dog | null> => {
  try {
    let result;
    await sqliteClient.db?.transactionAsync(async (tx) => {
      result = await tx.executeSqlAsync(
        "SELECT id, name, foodScoops FROM Dogs WHERE id = ?",
        [dogID]
      );
      result = result.rows[0];
    });
    return result as unknown as Dog;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateDog = async (dog: Dog): Promise<Dog | null> => {
  try {
    let result;
    await sqliteClient.db?.transactionAsync(async (tx) => {
      result = await tx.executeSqlAsync(
        "UPDATE Dogs set name = ?, foodScoops = ? WHERE id = ?",
        [dog.name, dog.foodScoops, dog.id?.toString() as string]
      );
      result = result.rows[0];
    });
    return result as unknown as Dog;
  } catch (err) {
    console.error(err);
    return null;
  }
};
