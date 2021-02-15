import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Unauthenticated", () => {
  it("should show login page default", () => {
    render(<App />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});

describe("Authenticated", () => {
  it("should render authorized page", () => {
    render(
      <App
        user={{
          id: 1,
          name: "bb",
          email: "7599@qq.com",
          token: "valid-token",
        }}
      />
    );
    expect(screen.getByText("Welcome bb")).toBeInTheDocument();
  });
});
