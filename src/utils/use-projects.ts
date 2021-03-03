import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProjectProps } from "screens/project-list";
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

export const useAddProject = () => {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<ProjectProps>) =>
      client(`projects/${params.id}`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useClient();

  return useQuery<ProjectProps>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
