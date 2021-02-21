import { renderHook, act } from "@testing-library/react-hooks";
import { useAsync } from "./use-async";

describe("use Async", () => {
  it("should get null data when promise is created", () => {
    const { result } = renderHook(() => useAsync());
    expect(result.current.data).toBe(null);
  });

  it("should run promise to get data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    act(() => {
      result.current.run(Promise.resolve("ok")).then();
    });
    await waitForNextUpdate();
    expect(result.current.data).toStrictEqual("ok");
  });

  it("should accept setData from outside", () => {
    const { result } = renderHook(() => useAsync());
    act(() => {
      result.current.setData("ok");
    });
    expect(result.current.data).toStrictEqual("ok");
  });

  it("should be idle status when async action is just created", () => {
    const { result } = renderHook(() => useAsync());
    expect(result.current.isIdle).toBe(true);
  });

  it("should be loading status when async action is doing", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    act(() => {
      result.current.run(Promise.resolve());
    });
    expect(result.current.isLoading).toBe(true);
    // avoid below warnning
    // An update to TestComponent inside a test was not wrapped in act(...).
    await waitForNextUpdate();
  });

  it("should be success status after fetching data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    act(() => {
      result.current.run(Promise.resolve());
    });
    await waitForNextUpdate();
    expect(result.current.isSuccess).toBe(true);
  });
});
