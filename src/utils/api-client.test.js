import { getToken, localStorageKey } from "../auth-provider";
import { client } from "./api-client";

describe("Api-client", () => {
  it("should support post method", async () => {
    const result = await client("/login", { method: "POST" }).then();
    expect(result.message).toBe("hello world!");
  });

  it("should support get method", async () => {
    const result = client("/me").then();
    await expect(result).rejects.toEqual("Please re-authenticate.");
  });

  it("should delete token, refresh, throw error when get 401 status code", async () => {
    expect(getToken()).toBe(undefined);
    window.localStorage.setItem(localStorageKey, "valid-token");
    expect(getToken()).toBe("valid-token");

    const result = client("/me", { token: undefined }).then();

    await expect(result).rejects.toEqual("Please re-authenticate.");
    expect(getToken()).toBe(undefined);
  });
});
