import { localStorageKey } from "auth-provider";
import { ls } from "./ls-client";

describe("localStorage", () => {
  it("can save data", () => {
    ls.set(localStorageKey, "valid-token");
    expect(ls.get(localStorageKey)).toBe("valid-token");
  });

  it("should auto serialize object data when storing and retrieving", function () {
    ls.set("test-object", { user: { name: "vf" } });
    expect(ls.get("test-object")).toEqual({ user: { name: "vf" } });
  });
});
