import { renderHook } from "@testing-library/react-hooks";
import { useClient } from "./use-client";
import * as Http from "utils/api-client";
import { useAuth } from "./hooks";
import { mocked } from "ts-jest/utils";

jest.mock("./hooks");
jest.spyOn(Http, "client");

describe("useClient", () => {
  beforeEach(() => {
    (mocked(useAuth) as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        name: "vf",
        token: "valid-user-token",
      },
    });
  });

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
    expect(typeof result.current).toStrictEqual("function");

    result.current("/me", { data: { name: "bb", age: 35 } });
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
      data: { name: "bb", age: 35 },
    });
  });
});
