import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { DarkProvider } from "./dark-context";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DarkProvider>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </DarkProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
