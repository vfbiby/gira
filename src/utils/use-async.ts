import { useState } from "react";
import { useMountedRef } from "./use-mountedRef";

export function useAsync<D>() {
  const [data, setStateData] = useState<D | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setStateError] = useState<Error | null>(null);
  const [retry, setRetry] = useState(() => () => {});
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
    config?: { throwOnError?: boolean; retry?: () => Promise<D> }
  ): Promise<any> => {
    setRetry(() => () => {
      if (config?.retry) {
        run(config?.retry(), config);
      }
    });
    setStatus("pending");

    return promise
      .then((response) => {
        if (mountedRef.current) {
          setData(response);
          setStatus("success");
        }
        return response;
      })
      .catch((error) => {
        setStatus("error");
        setStateError(error);
        if (config?.throwOnError) return Promise.reject(error);
        return error;
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
    retry,
  };
}
