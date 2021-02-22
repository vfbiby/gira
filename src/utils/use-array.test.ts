import { renderHook, RenderResult } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useArray } from "./use-array";

describe("useArray", () => {
  let persons: { name: string; age: number }[];
  let result: any;

  beforeEach(() => {
    persons = [
      { name: "jack", age: 25 },
      { name: "ma", age: 22 },
    ];
    result = renderHook(() => useArray(persons)).result;
  });

  it("should return value of array", () => {
    expect(result.current.value).toStrictEqual(persons);
  });

  it("should return add function for add item to array", () => {
    expect(result.current.value).toStrictEqual(persons);
    const tielin = { name: "tielin", age: 34 };
    act(() => {
      result.current.add(tielin);
    });
    expect(result.current.value).toStrictEqual([...persons, tielin]);
  });

  it("should return removeIndex for removing specify index of array", () => {
    act(() => {
      result.current.removeIndex(0);
    });
    expect(result.current.value).toStrictEqual([persons[1]]);
  });

  it("should return clear for erase whole array", () => {
    act(() => {
      result.current.clear();
    });
    expect(result.current.value).toStrictEqual([]);
  });
});
