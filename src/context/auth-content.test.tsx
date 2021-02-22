import { render, waitFor } from "@testing-library/react";
import React from "react";
import { useAuth } from "utils/hooks";
import * as hooks from "utils/use-async";
import { AuthProvider } from "./auth-context";

describe("auth-context", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should show loading when jest be rendered", () => {
    const useEffect: jest.SpyInstance = jest
      .spyOn(React, "useEffect")
      .mockImplementation(() => {});

    const { queryByText, container } = render(
      <AuthProvider>
        <span>children</span>
      </AuthProvider>
    );

    expect(container.querySelector("span.ant-spin-dot")).toBeInTheDocument();
    expect(queryByText("children")).not.toBeInTheDocument();
    expect(useEffect).toHaveBeenCalledTimes(2);
  });

  it("should show loading when it begin to fetch user", () => {
    jest.spyOn(hooks, "useAsync").mockImplementation(() => ({
      data: null,
      isIdle: false,
      isLoading: true,
      isSuccess: false,
      isError: false,
      run: jest.fn(),
      error: null,
      setData: jest.fn(),
      setError: jest.fn(),
    }));

    const { queryByText, container } = render(
      <AuthProvider>
        <span>children</span>
      </AuthProvider>
    );

    expect(container.querySelector("span.ant-spin-dot")).toBeInTheDocument();
    expect(queryByText("children")).not.toBeInTheDocument();
  });

  it("should show children when fetching data is ok", async () => {
    jest.spyOn(hooks, "useAsync").mockImplementation(() => ({
      data: { name: "bob" },
      isIdle: false,
      isLoading: false,
      isSuccess: true,
      isError: false,
      run: jest.fn(),
      error: null,
      setData: jest.fn(),
      setError: jest.fn(),
    }));

    const Child = () => {
      const { user } = useAuth();
      return <div>welcome {user?.name}</div>;
    };

    const { container } = render(
      <AuthProvider>
        <Child />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(container.textContent).toBe("welcome bob");
    });
  });
});
