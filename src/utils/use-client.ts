import { useCallback } from "react";
import { client } from "./api-client";
import { useAuth } from "./hooks";

export const useClient = () => {
  const { user } = useAuth();

  return useCallback(
    (...[url, config]: Parameters<typeof client>) => {
      client(url, { ...config, token: user?.token });
    },
    [user?.token]
  );
};
