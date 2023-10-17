import { useState, useEffect } from "react";
import { getDogs as getDogData } from "../data";
import { useIsFocused } from "@react-navigation/native";

const useDogs = () => {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getDogs().then((dogs) => {
      setLoading(true);
      setDogs(dogs as Dog[]);
      setLoading(false);
    });
  }, [focused]);

  const getDogs = async (): Promise<Dog[] | null> => {
    const response = await getDogData();
    return response;
  };

  return { loading, dogs };
};

export default useDogs;
