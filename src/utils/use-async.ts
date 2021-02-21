import { useState } from "react";
import { useMountedRef } from "./use-mountedRef";

export function useAsync<D>() {
  const [user, setUser] = useState<D | null>(null);
  const [status, setStatus] = useState("idle");
  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setUser(data);
  };

  const run = async (promise: Promise<D>): Promise<any> => {
    setStatus("pending");

    return promise
      .then((response) => {
        if (mountedRef.current) {
          setData(response);
          setStatus("success");
        }
        return response;
      })
      .catch(() => {});
  };

  return {
    data: user,
    isIdle: status === "idle",
    isLoading: status === "pending",
    isSuccess: status === "success",
    run,
    setData,
  };
}
