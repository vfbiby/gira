import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebouncevalue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncevalue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return { debounceValue };
};
