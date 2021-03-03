import React from "react";
import { useDebounce } from "utils/use-debounce";
import { useDocumentTitle } from "utils/use-documentTitle";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { ProjectsList } from "./list";
import { ProjectModel } from "./project-modal";
import { SearchPanel } from "./search-panel";
import { useProjectModal, useProjectsSearchParams } from "./utils";

export interface ProjectProps {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export const ProjectsListScreen = () => {
  useDocumentTitle("项目列表");

  const { data: users } = useUsers();
  const [projectsParams, setParam] = useProjectsSearchParams();
  const { data: projects, isLoading } = useProjects(
    useDebounce(projectsParams, 500)
  );
  const { open } = useProjectModal();

  return (
    <div className="rounded dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold dark:text-white">
          项目列表
        </h1>
        <div className="flex items-center justify-between pb-2">
          <SearchPanel
            param={projectsParams}
            setParam={setParam}
            users={users || []}
          />
          <button
            className="px-4 py-2 uppercase bg-gray-300 rounded focus:outline-none dark:text-white"
            onClick={open}
          >
            Create project
          </button>
        </div>
      </div>
      <div className="p-10 mt-2 bg-blue-100 rounded-t-xl dark:bg-gray-800 ">
        <ProjectsList isLoading={isLoading} users={users} projects={projects} />
      </div>
      <ProjectModel />
    </div>
  );
};
ProjectsListScreen.whyDidYouRender = false;
