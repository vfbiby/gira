import { useState } from "react";
import { useMountedRef } from "./use-mountedRef";

export function useAsync<D>() {
  const [data, setStateData] = useState<D | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setStateError] = useState<Error | null>(null);
  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setStateError(null);
    setStatus("success");
    setStateData(data);
  };

  const setError = (error: Error) => {
    setStateData(null);
    setStatus("error");
    setStateError(error);
  };

  const run = async (
    promise: Promise<D>,
    config?: { throwOnError: boolean }
  ): Promise<any> => {
    setStatus("pending");

    return promise
      .then((response) => {
        if (mountedRef.current) {
          setData(response);
          setStatus("success");
        }
        return response;
      })
      .catch((response) => {
        setStatus("error");
        setStateError(response);
        if (config?.throwOnError) return Promise.reject(response);
      });
  };

  return {
    data,
    isIdle: status === "idle",
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    run,
    setData,
    setError,
  };
}
