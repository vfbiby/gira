import { cleanup, renderHook } from "@testing-library/react-hooks";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(cleanup);
  it("should return first value when giving just one value", async () => {
    const { result } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );
    expect(result.current).toBe("first");
  });

  it("should return last value when assign value many times", async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );
    rerender({ value: "second", delay: 500 });
    rerender({ value: "three", delay: 500 });
    await waitForNextUpdate();
    expect(result.current).toBe("three");
  });
});
