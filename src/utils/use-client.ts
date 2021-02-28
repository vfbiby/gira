import { client } from "./api-client";
import { useAuth } from "./hooks";

export const useClient = () => {
  const { user } = useAuth();

  return (url: string) => {
    client(url, { token: user?.token });
  };
};
