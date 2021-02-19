import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { localStorageKey } from "./auth-provider";
import { mockSystemPrefersColorThemeTo } from "./mocks/mock-lib";
import { DarkProvider } from "./context/dark-context";

describe("Unauthenticated", () => {
  beforeEach(() => {
    mockSystemPrefersColorThemeTo(true);
  });
  it("should show login page if there is no token in localStorage", async () => {
    render(
      <DarkProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DarkProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Password")).toBeInTheDocument();
    });
  });
});

describe("Authenticated", () => {
  beforeEach(() => {
    mockSystemPrefersColorThemeTo(true);
  });
  it("should render authorized page when token is valid", async () => {
    window.localStorage.setItem(localStorageKey, "token-user-bb");
    render(
      <DarkProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DarkProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Welcome bb")).toBeInTheDocument();
    });
  });
});
