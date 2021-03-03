import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<ProjectProps>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
