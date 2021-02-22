import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { DarkProvider } from "./dark-context";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <DarkProvider>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </DarkProvider>
  );
};

export default AppProviders;
