import { cleanup, renderHook } from "@testing-library/react-hooks";
import { useMountedRef } from "./use-mountedRef";

describe("useMountedRef", () => {
  it("should be true when it be mounted", () => {
    const  { result }  = renderHook(() => useMountedRef());
    expect(result.current.current).toBe(true);
  });

  it("should be false when it be unmounted", function(){
    const  { result }  = renderHook(() => useMountedRef());
    expect(result.current.current).toBe(true);
    cleanup();
    expect(result.current.current).toBe(false);
  })
});
