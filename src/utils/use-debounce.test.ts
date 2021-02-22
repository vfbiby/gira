import { renderHook } from "@testing-library/react-hooks";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  it("should return first value when giving just one value", async () => {
    const { result, waitForNextUpdate } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );
    await waitForNextUpdate();
    expect(result.current.debounceValue).toBe("first");
  });

  it("should return second value when assign twice", async () => {});
});
