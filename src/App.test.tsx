import React from "react";
import { render, screen } from "@testing-library/react";
import App, { AuthContext } from "./App";

describe("Unauthenticated", () => {
  it("should show login page default", () => {
    render(<App />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});

describe("Authenticated", () => {
  it("should render authorized page", () => {
    window.localStorage.setItem("__auth_provider_token", "token-user-bb");
    render(
      <AuthContext.Provider
        value={{
          id: 1,
          name: "bb",
          email: "3432@qq.com",
          token: "valid-token",
        }}
      >
        <App />
      </AuthContext.Provider>
    );
    expect(screen.getByText("Welcome bb")).toBeInTheDocument();
  });

  beforeEach(() => {
    window.localStorage.removeItem("__auth_provider_token");
  });
});
