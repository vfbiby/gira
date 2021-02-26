import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { act } from "react-dom/test-utils";
import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import { useUrlQueryParam } from "./useUrlQueryParam";

const SearchPage = ({ children }: { children: any }) => {
  return <div>{children}</div>;
};

describe("useUrlQueryParam", () => {
  let wrapper: ({ children }: { children: any }) => JSX.Element;

  beforeEach(() => {
    wrapper = ({ children }: { children: any }) => (
      <Router initialEntries={["/projects?greeting=hello&name=vf&age=35"]}>
        <Routes>
          <Route
            path="/projects"
            element={<SearchPage>{children}</SearchPage>}
          />
        </Routes>
      </Router>
    );
  });

  it("should return specify key's value", () => {
    const { result } = renderHook(() => useUrlQueryParam(["greeting"]), {
      wrapper,
    });
    expect(result.current[0].greeting).toStrictEqual("hello");
  });

  it("should return multiplue keys value", () => {
    const { result } = renderHook(
      () => useUrlQueryParam(["greeting", "name", "age"]),
      {
        wrapper,
      }
    );
    expect(result.current[0]).toStrictEqual({
      greeting: "hello",
      name: "vf",
      age: "35",
    });
  });
});
