import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

export function useUser<D>(initialUser?: D) {
  const [user, setUser] = useState(initialUser);
  const run = async (promise: Promise<D>): Promise<any> => {
    return promise.then((response) => {
      setUser(response);
      return response;
    });
  };
  return { user, run };
}
