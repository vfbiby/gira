import { PageLoading } from "components/page-loading";
import { ProjectForm } from "./project-form";
import { useProjectModal } from "./utils";

export const ProjectModel = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const title = editingProject ? "Edit Project" : "Create Project";

  return (
    <div
      className={`${
        projectModalOpen ? "block" : "hidden"
      } fixed inset-0 flex z-50 items-center bg-black bg-opacity-50 justify-center w-full h-full`}
    >
      <div className="w-3/5 max-h-full p-8 overflow-auto bg-white opacity-100 dark:bg-gray-800 h-3/5">
        <div className="relative block">
          <div className="flex justify-center title">
            {isLoading ? (
              <PageLoading isLoading={isLoading} />
            ) : (
              <div>
                <h1 className="text-5xl font-semibold">{title}</h1>
                <ProjectForm editingProject={editingProject} />
              </div>
            )}
            <button className="absolute top-2 right-3" onClick={close}>
              X
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
