import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "utils/use-projects";
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
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const [_, setUrlParams] = useSearchParams();

  const open = () => setProjectModalOpen({ projectCreate: true });
  const close = () => {
    setUrlParams({
      projectCreate: "",
      editingProjectId: "",
    });
    //setProjectModalOpen({ projectCreate: undefined });
    //setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  } as const;
};
