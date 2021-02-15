import React, { ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = React.createContext<User | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        id: 1,
        name: "bb",
        email: "3432@qq.com",
        token: "valid-token",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
