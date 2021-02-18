import { render, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { mockSystemPrefersColorThemeTo } from "../mocks/mock-lib";
import { DarkProvider, useDarkTheme } from "./dark-context";

describe("DarkProvider", () => {
  beforeEach(() => {
    mockSystemPrefersColorThemeTo(false);
  });

  it("should not add dark class to body when darkMode is not enable", async () => {
    render(
      <DarkProvider>
        <div>testing for DarkProvider</div>
      </DarkProvider>
    );
    await waitFor(() => {
      expect(document.documentElement.classList.toString()).toBe("");
    });
  });

  it("should add dark class to body when darkMode is enable", async () => {
    //these two will make DarkProvider get darkMode is enable
    mockSystemPrefersColorThemeTo(true);
    //localStorage.setItem(darkModeKey, "true");
    render(
      <DarkProvider>
        <div>testing for DarkProvider</div>
      </DarkProvider>
    );
    await waitFor(() => {
      expect(document.documentElement.classList.toString()).toBe("dark");
    });
  });
  it("should provide isDark, setDark for descendants", () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <DarkProvider>{children}</DarkProvider>;
    };
    const { result } = renderHook(() => useDarkTheme(), { wrapper });
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.toString()).toBe("");

    act(() => {
      result.current.setDark(true);
    });

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.toString()).toBe("dark");
  });
});
