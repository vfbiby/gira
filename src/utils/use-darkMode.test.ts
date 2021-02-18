import { renderHook } from "@testing-library/react-hooks";
import { mockSystemPrefersColorThemeTo } from "../mocks/mock-lib";
import { useDarkMode } from "./use-darkMode";

describe("useDarkMode", () => {
  beforeEach(() => {
    mockSystemPrefersColorThemeTo(false);
  });
  afterEach(() => {
    localStorage.removeItem("theme");
  });

  it("should return false by default", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
  });

  it("should return true when localStorage has dark", function () {
    window.localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
  });

  it("should return true if system is in darkMode", function () {
    mockSystemPrefersColorThemeTo(true);
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
  });

  it("should return true if localStorage is set to light but system is in darkMode", function () {});
});
