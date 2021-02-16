import { getToken, localStorageKey } from "../auth-provider";
import { client } from "./api-client";

describe("Api-client", () => {
  it("should delete token, refresh, throw error when get 401 status code", async () => {
    expect(getToken()).toBe(undefined);
    window.localStorage.setItem(localStorageKey, "valid-token");
    expect(getToken()).toBe("valid-token");

    const result = client("http://localhost/me", { token: undefined }).then();

    await expect(result).rejects.toEqual('Please re-authenticate.');
    expect(getToken()).toBe(undefined);
  });
});
