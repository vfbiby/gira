import { renderHook } from "@testing-library/react-hooks";
import { useClient } from "./use-client";
import * as Http from "utils/api-client";
import { useAuth } from "./hooks";
import { mocked } from "ts-jest/utils";

jest.mock("./hooks");
const spyClient = jest.spyOn(Http, "client");

describe("useClient", () => {
  beforeEach(() => {
    updateAuthContext();
  });

  const updateAuthContext = (user?: { [key: string]: string | number }) => {
    (mocked(useAuth) as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        name: "vf",
        token: "valid-user-token",
        ...user,
      },
    });
  };

  it("should take token when send a request", async () => {
    const { result } = renderHook(() => useClient());
    expect(typeof result.current).toStrictEqual("function");

    result.current("/me");
    expect(Http.client).toHaveBeenCalledTimes(1);
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
    });
  });

  it("should take data when send a request", function () {
    const { result } = renderHook(() => useClient());

    result.current("/me", { data: { name: "bb", age: 35 } });
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
      data: { name: "bb", age: 35 },
    });
  });

  it("should pass extra params like method, headers to client", function () {
    const { result } = renderHook(() => useClient());
    result.current("/me", {
      method: "POST",
      headers: { Authorization: "bear 234" },
    });
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
      method: "POST",
      headers: { Authorization: "bear 234" },
    });
  });

  it("should return not same instance if token change", function () {
    const { result, rerender } = renderHook(() => useClient());
    const oldCallback = result.current;

    updateAuthContext({
      token: "second-token",
    });

    rerender();
    expect(oldCallback).not.toStrictEqual(result.current);
  });

  it("should return same instance if token not change", function () {
    const { result, rerender } = renderHook(() => useClient());
    const oldCallback = result.current;
    rerender();
    expect(oldCallback).toStrictEqual(result.current);
  });

  it("should use updated token", function () {
    const { result, rerender } = renderHook(() => useClient());

    result.current("/me", { data: { name: "bb", age: 35 } });
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
      data: { name: "bb", age: 35 },
    });

    updateAuthContext({
      token: "second-token",
    });
    rerender();
    result.current("/me");

    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "second-token",
    });
  });

  it("should get response when call returned client", async function () {
    spyClient.mockRestore();
    const { result } = renderHook(() => useClient());
    const resPromise = result.current("/me").then();

    expect(await resPromise).toStrictEqual({
      email: "3432@qq.com",
      id: 1,
      name: "bb",
      token: "valid-token",
    });
  });
});
