import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import { useUrlQueryParam } from "./useUrlQueryParam";

const SearchPage = ({ children }: { children: any }) => {
  return <div>{children}</div>;
};

describe("useUrlQueryParam", () => {
  it("should return specify key's value", () => {
    const wrapper = ({ children }: { children: any }) => (
      <Router initialEntries={["/projects?greeting=hello"]}>
        <Routes>
          <Route
            path="/projects"
            element={<SearchPage>{children}</SearchPage>}
          />
        </Routes>
      </Router>
    );
    const { result } = renderHook(() => useUrlQueryParam(), { wrapper });

    expect(result.current).toBe("hello");
  });
});
