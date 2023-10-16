import { useState } from "react";
import { saveDog as persistDog } from "../data";

const useDogRegistrationStorage = () => {
  const [loading, setLoading] = useState(false);
  const saveDog = async (dog: Dog): Promise<Dog | null> => {
    setLoading(true);
    const response = await persistDog(dog);
    setLoading(false);
    return response;
  };

  return { saveDog, loading };
};

export default useDogRegistrationStorage;
