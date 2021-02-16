import { getToken, localStorageKey } from "../auth-provider";
import { client } from "./api-client";

describe("Api-client", () => {
  it("should delete token when get 401 status code", async () => {
    expect(getToken()).toBe(undefined);
    window.localStorage.setItem(localStorageKey, 'valid-token');
    expect(getToken()).toBe('valid-token');

    await client("http://localhost/me", { token: undefined });

    expect(getToken()).toBe(undefined);
  });
});
