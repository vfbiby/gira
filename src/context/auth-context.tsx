import React, { ReactNode } from "react";
import * as Auth from "../auth-provider";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/use-async";

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = React.createContext<User | null | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, run } = useAsync<User | undefined>();
  React.useEffect(() => {
    let token = Auth.getToken();
    run(client("/me", { token }));
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
