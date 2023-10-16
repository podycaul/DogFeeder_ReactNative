import { useState, useEffect } from "react";
import { getDogs as getDogList, deleteDog as deleteDogData } from "../data";
import { useIsFocused } from "@react-navigation/native";

export const useDogList = () => {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[] | null>();

  useEffect(() => {
    setLoading(true);
    getDogs().then((data) => setDogs(data));
    setLoading(false);
  }, [focused]);

  const getDogs = async (): Promise<Dog[] | null> => {
    const dogs = await getDogList();
    return dogs;
  };

  const editDog = async (): Promise<Dog | null> => {};

  const deleteDog = async (dogID: number): Promise<boolean> => {
    setLoading(true);
    if (!(await deleteDogData(dogID))) {
      setLoading(false);
      return false;
    } else {
      setDogs((prev) => prev?.filter((dog) => dog.id !== dogID));
      return true;
    }
  };

  return { loading, dogs, editDog, deleteDog };
};
