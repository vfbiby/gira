import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { AuthContext, User } from "../context/auth-context";
import { useAuth } from "./hooks";

describe("useAuth", () => {
  it("should get context value from ancestor", () => {
    const user: User = {
      id: 1,
      name: "bb",
      email: "3432@qq.com",
      token: "valid-token",
    };
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.name).toEqual("bb");
    expect(result.current?.id).toEqual(1);
  });

  it("should throw an error when useAuth not wrapped by context", function () {
    const { result } = renderHook(() => useAuth());
    expect(result.error).toEqual(
      Error("useAuth must be used within a AuthProvider")
    );
  });
});
