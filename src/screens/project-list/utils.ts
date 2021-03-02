import { useMemo } from "react";
import { useUrlQueryParam } from "utils/useUrlQueryParam";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParams = useMemo(
    () => ({
      ...param,
      personId: Number(param.personId) || undefined,
    }),
    [param]
  );

  return [projectsParams, setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectModalOpen({ projectCreate: true });
  const close = () => setProjectModalOpen({ projectCreate: undefined });

  return { projectModalOpen: projectCreate === "true", open, close } as const;
};
