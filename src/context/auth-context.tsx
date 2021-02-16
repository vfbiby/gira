import React, { ReactNode } from "react";
import { useUser } from "../utils/hooks";

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = React.createContext<User | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, run } = useUser<User | undefined>();
  React.useEffect(() => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    run(
      window.fetch("http://localhost/me", config).then(async (response) => {
        return await response.json();
      })
    );
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
