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
    setStatus("loading");

    return promise
      .then((response) => {
        if (mountedRef.current) {
          setData(response);
        }
        return response;
      })
      .catch(() => {});
  };
  return { user, isIdle: status === "idle", run, setData };
}
