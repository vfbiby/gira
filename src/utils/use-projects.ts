import { useQuery } from "react-query";
import { ProjectProps } from "screens/project-list";
import { useAsync } from "./use-async";
import { useClient } from "./use-client";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const client = useClient();

  return useQuery(["projects", param], () =>
    client("/projects", { data: param })
  );
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
