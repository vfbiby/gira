import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useMountedRef } from "./use-mountedRef";

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

export function useAsync<D>(initialUser?: D) {
  const [user, setUser] = useState(initialUser);
  const mountedRef = useMountedRef();
  const run = async (promise: Promise<D>): Promise<any> => {
    return promise.then((response) => {
      if (mountedRef.current) {
        setUser(response);
      }
      return response;
    });
  };
  return { user, run };
}
