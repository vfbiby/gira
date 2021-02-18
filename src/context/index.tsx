import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import {DarkProvider} from "./dark-context";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <DarkProvider>
      <AuthProvider>{children}</AuthProvider>
    </DarkProvider>
  );
};

export default AppProviders;
