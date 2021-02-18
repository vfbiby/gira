import { renderHook } from "@testing-library/react-hooks";
import { mockSystemPrefersColorThemeTo } from "../mocks/mock-lib";
import { darkModeKey, useDarkMode } from "./use-darkMode";

describe("useDarkMode", () => {
  beforeEach(() => {
    mockSystemPrefersColorThemeTo(false);
    localStorage.removeItem(darkModeKey);
  });

  it("should return false by default", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
  });

  it("should return true when localStorage has dark", function () {
    window.localStorage.setItem(darkModeKey, "true");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
  });

  it("should return true if system is in darkMode", function () {
    mockSystemPrefersColorThemeTo(true);
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
  });

  it("should return false because localStorage has high priority then system darkMode", function () {
    mockSystemPrefersColorThemeTo(true);
    window.localStorage.setItem(darkModeKey, "false");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
  });
});
