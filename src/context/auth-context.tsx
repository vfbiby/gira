import React, { ReactNode } from "react";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = React.createContext<User | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, run } = useAsync<User | undefined>();
  React.useEffect(() => {
    let token = window.localStorage.getItem('__auth_provider_token') || undefined;
    run(client("http://localhost/me", { token }));
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
