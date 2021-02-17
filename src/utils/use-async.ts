import { useState } from "react";
import { useMountedRef } from "./use-mountedRef";

export function useAsync<D>(initialUser?: D) {
  const [user, setUser] = useState(initialUser);
  const mountedRef = useMountedRef();
  const run = async (promise: Promise<D>): Promise<any> => {
    return promise
      .then((response) => {
        if (mountedRef.current) {
          setUser(response);
        }
        return response;
      })
      .catch(() => {});
  };
  return { user, run };
}
