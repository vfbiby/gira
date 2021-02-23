import { useEffect } from "react";
import { ProjectProps } from "screens/project-list";
import { client } from "./api-client";
import { useAsync } from "./use-async";

export const useProjects = (param: Partial<ProjectProps>) => {
  const { run, ...rest } = useAsync<ProjectProps[] | null>();

  useEffect(() => {
    run(client("/projects", { data: param }));
  }, [param]);

  return rest;
};
