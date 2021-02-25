import { renderHook, act } from "@testing-library/react-hooks";
import { useAsync } from "./use-async";

describe("use Async", () => {
  describe("success", () => {
    it("should get null data when promise is created", () => {
      const { result } = renderHook(() => useAsync());
      expect(result.current.data).toBe(null);
    });

    it("should get undefined when promise is resolved with nothing", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAsync());
      act(() => {
        result.current.run(Promise.resolve());
      });
      await waitForNextUpdate();
      expect(result.current.data).toStrictEqual(undefined);
    });

    it("should run promise to get data", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAsync());
      act(() => {
        result.current.run(Promise.resolve("ok"));
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

    it("should erase error and set data when a failure useAsync turn into success", () => {
      const { result } = renderHook(() => useAsync());
      act(() => {
        result.current.setError(new Error("some errors founded"));
      });
      expect(result.current.data).toStrictEqual(null);
      expect(result.current.error).toStrictEqual(
        new Error("some errors founded")
      );

      act(() => {
        result.current.setData("ok");
      });

      expect(result.current.isError).toBe(false);
      expect(result.current.data).toStrictEqual("ok");
      expect(result.current.error).toStrictEqual(null);
    });
  });

  describe("status", () => {
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

  describe("error", () => {
    it("should be error status if promise rejected", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAsync());
      act(() => {
        result.current.run(Promise.reject("rejected"));
      });
      await waitForNextUpdate();
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe("rejected");
    });

    it("should erase data when a successed async turn into error", () => {
      const { result } = renderHook(() => useAsync());
      act(() => {
        result.current.setData("ok");
      });
      expect(result.current.data).toStrictEqual("ok");

      act(() => {
        result.current.setError(new Error("some errors founded"));
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toStrictEqual(null);
      expect(result.current.error).toStrictEqual(Error("some errors founded"));
    });

    it("should throw an error and setError when specify throwOnError", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAsync());

      act(() => {
        result.current
          .run(Promise.reject("rejected"), { throwOnError: true })
          .catch((res) => {
            expect(res).toBe("rejected");
          });
      });

      await waitForNextUpdate();
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toStrictEqual("rejected");
    });
  });
});
