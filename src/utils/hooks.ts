import { useContext, useEffect, useState } from "react";
import { AuthContext, User } from "../context/auth-context";

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

//const defaultInitUserState: <D> = { };

export function useUser<D>(initialUser?: D) {
  const [user, setUser] = useState(initialUser);
  const run = async (promise: Promise<D>) => {
    return promise.then((user) => {
      setUser(user);
      return user;
    });
  };
  return { user, run };
}
