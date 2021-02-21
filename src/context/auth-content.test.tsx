import { render } from "@testing-library/react";
import React from "react";
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

    const { container } = render(
      <AuthProvider>
        <span>children</span>
      </AuthProvider>
    );

    expect(container.querySelector("span.ant-spin-dot")).toBeInTheDocument();
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

    const { container } = render(
      <AuthProvider>
        <span>children</span>
      </AuthProvider>
    );

    expect(container.querySelector("span.ant-spin-dot")).toBeInTheDocument();
  });
});
