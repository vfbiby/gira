import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = () => {
  const [searchParams] = useSearchParams();

  return searchParams.get("greeting");
};
