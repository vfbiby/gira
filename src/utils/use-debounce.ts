import { useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebouncevalue] = useState('');
  setTimeout(() => {
    setDebouncevalue(value);
  }, delay);
  return { debounceValue };
};
