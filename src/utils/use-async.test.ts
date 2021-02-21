import { renderHook, act } from "@testing-library/react-hooks";
import { useAsync } from "./use-async";

describe("use Async", () => {
  it("should get null data when promise is created", () => {
    const { result } = renderHook(() => useAsync());
    expect(result.current.user).toBe(null);
  });

  it("should run promise to get data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    act(() => {
      result.current.run(Promise.resolve("ok")).then();
    });
    await waitForNextUpdate();
    expect(result.current.user).toStrictEqual("ok");
  });

  it("should accept setData from outside", () => {
    const { result } = renderHook(() => useAsync());
    act(() => {
      result.current.setData("ok");
    });
    expect(result.current.user).toStrictEqual("ok");
  });

  it("should be idle status when async action is just created", () => {
    const { result } = renderHook(() => useAsync());
    expect(result.current.isIdle).toBe(true);
  });

  it("should be loading status when async action is doing", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    act(() => {
      result.current.run(Promise.resolve("ok"));
    });
    await waitForNextUpdate();
    expect(result.current.isIdle).toBe(false);
    expect(result.current.user).toBe("ok");
  });
});
