import {
  FullPage,
  FullPageErrorFallback,
  FullPageSpinner,
} from "components/full-page";
import React, { ReactNode } from "react";
import * as Auth from "../auth-provider";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/use-async";

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  avator_url?: string;
}

export interface Form {
  username: string;
  password: string;
}

export const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: Form) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isIdle,
    isLoading,
    isError,
    error,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: Form) => Auth.login(form).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  React.useEffect(() => {
    let token = Auth.getToken();
    run(client("/me", { token }));
  }, []);

  if (isIdle || isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
