import { useState } from "react";

export const useArray = <T>(inputArray: T[]) => {
  const [array, setArray] = useState(inputArray);
  const add = (item: T) => {
    setArray([...array, item]);
  };
  const removeIndex = (index: number) => {
    setArray(array.filter((_, i) => index !== i));
  };
  const clear = () => {
    setArray([]);
  };
  return { value: array, setArray, add, removeIndex, clear };
};
