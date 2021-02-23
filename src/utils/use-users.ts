import { User } from "context/auth-context";
import { useEffect } from "react";
import { client } from "./api-client";
import { cleanObject } from "./clean-object";
import { useAsync } from "./use-async";

export const useUsers = (param: Partial<User>) => {
  const { data: users, run } = useAsync<User[] | null>();

  useEffect(() => {
    run(client("/users", { data: cleanObject(param) }));
  }, ["param"]);
  return { users };
};
