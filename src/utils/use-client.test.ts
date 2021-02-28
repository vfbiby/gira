import { renderHook } from "@testing-library/react-hooks";
import { useClient } from "./use-client";
import * as Http from "utils/api-client";
import { useAuth } from "./hooks";
import { mocked } from "ts-jest/utils";

jest.mock("./hooks");

describe("useClient", () => {
  it("should take token when send a request", async () => {
    jest.spyOn(Http, "client");
    (mocked(useAuth) as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        name: "vf",
        token: "valid-user-token",
      },
    });
    const { result } = renderHook(() => useClient());
    expect(typeof result.current).toStrictEqual("function");

    result.current("/me");
    expect(Http.client).toHaveBeenCalledTimes(1);
    expect(Http.client).toHaveBeenCalledWith("/me", {
      token: "valid-user-token",
    });
  });
});
