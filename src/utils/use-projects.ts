import { useEffect } from "react";
import { ProjectProps } from "screens/project-list";
import { client } from "./api-client";
import { cleanObject } from "./clean-object";
import { useAsync } from "./use-async";
import { useClient } from "./use-client";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const { run, ...rest } = useAsync<ProjectProps[] | null>();

  useEffect(() => {
    run(client("/projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return rest;
};

export const useEditProject = () => {
  const { run, ...rest } = useAsync();
  const client = useClient();
  const mutate = (params: Partial<ProjectProps>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };

  return {
    mutate,
    ...rest,
  };
};
