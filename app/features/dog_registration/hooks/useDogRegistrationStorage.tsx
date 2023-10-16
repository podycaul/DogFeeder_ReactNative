import { useState } from "react";
import {
  saveDog as persistDog,
  getDog as getDogData,
  updateDog as updateDogData,
} from "../data";

const useDogRegistrationStorage = () => {
  const [loading, setLoading] = useState(false);
  const saveDog = async (dog: Dog): Promise<Dog | null> => {
    setLoading(true);
    const response = await persistDog(dog);
    setLoading(false);
    return response;
  };

  const getDog = async (dogID: number): Promise<Dog | null> => {
    setLoading(true);
    const response = await getDogData(dogID);
    setLoading(false);
    return response;
  };

  const updateDog = async (dog: Dog): Promise<Dog | null> => {
    setLoading(true);
    const response = await updateDogData(dog);
    setLoading(false);
    return response;
  };

  return { saveDog, getDog, updateDog, loading };
};

export default useDogRegistrationStorage;
