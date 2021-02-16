import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/auth-context";

describe("Unauthenticated", () => {
  it("should show login page default", () => {
    render(<App />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});

describe("Authenticated", () => {
  it("should render authorized page", async () => {

    //const nock = require("nock");
    //nock("http://localhost").get("/me").reply(200, {
      //id: 1,
      //name: "bb",
      //email: "3432@qq.com",
      //token: "valid-token",
    //});
    //window.localStorage.setItem("__auth_provider_token", "token-user-bb");
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Welcome bb")).toBeInTheDocument();
    });
  });

  beforeEach(() => {
    window.localStorage.removeItem("__auth_provider_token");
  });
});
