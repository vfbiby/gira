import { renderHook, RenderResult } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useArray } from "./use-array";

interface IPersonProps {
  name: string;
  age: number;
}

interface IRenderResultProps {
  value: IPersonProps[];
  add: (item: IPersonProps) => void;
  removeIndex: (index: number) => void;
  setArray: (value: React.SetStateAction<IPersonProps[]>) => void;
  clear: () => void;
}

describe("useArray", () => {
  let persons: IPersonProps[];
  let result: RenderResult<IRenderResultProps>;

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

  it("should return setArray for setting a new array", () => {
    const newPerson = [...persons, { name: "vf", age: 33 }];
    act(() => {
      result.current.setArray(newPerson);
    });
    expect(result.current.value).toStrictEqual(newPerson);
  });
});
