import { localStorageKey } from "auth-provider";
import { ls } from "./ls-client";

describe("localStorage", () => {
  it("can save data", () => {
    ls.set(localStorageKey, "valid-token");
    expect(ls.get(localStorageKey)).toBe("valid-token");
  });
});
