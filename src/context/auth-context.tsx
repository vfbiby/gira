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
    const userPro = async () => {
      return {
        id: 1,
        name: "bb",
        email: "3432@qq.com",
        token: "valid-token",
      } as User;
    };
    run(userPro());
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
