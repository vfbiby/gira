import { getToken, localStorageKey } from "../auth-provider";
import { client } from "./api-client";

describe("Api-client", () => {
  it("should support get method", async () => {
    const result = client("/me").then();
    await expect(result).rejects.toEqual("Please re-authenticate.");
  });

  it("should support post method", async () => {
    const result = await client("/login", { method: "POST" }).then();
    expect(result.message).toBe("hello world!");
  });

  it("should accept data to post to server to login", async () => {
    const result = await client("/login", {
      method: "POST",
      data: { username: "vf", password: "bb" },
    }).then();
    expect(result).toStrictEqual({
      id: 1,
      name: "bb",
      email: "3432@qq.com",
      token: "valid-token",
    });
  });

  it("should delete token, refresh, throw error when get 401 status code", async () => {
    expect(getToken()).toBe(undefined);
    window.localStorage.setItem(localStorageKey, "valid-token");
    expect(getToken()).toBe("valid-token");
    //Act
    const result = client("/me", { token: undefined }).then();
    //Assert
    await expect(result).rejects.toEqual("Please re-authenticate.");
    expect(getToken()).toBe(undefined);
  });
});
