import React, { useState } from "react";
import { useDebounce } from "utils/use-debounce";
import { useDocumentTitle } from "utils/use-documentTitle";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { ProjectsList } from "./list";
import { SearchPanel } from "./search-panel";

export interface ProjectProps {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export const ProjectsListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: 0,
  });
  const { debouncedValue } = useDebounce(param, 500);
  const { data: users } = useUsers();
  const { data: projects, isLoading } = useProjects(debouncedValue);

  useDocumentTitle("项目列表");

  return (
    <div className="rounded dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold dark:text-white">
          项目列表
        </h1>
        <div className="pb-2">
          <SearchPanel param={param} setParam={setParam} users={users || []} />
        </div>
      </div>
      <div className="p-10 mt-2 bg-blue-100 rounded-t-xl dark:bg-gray-800 ">
        <ProjectsList isLoading={isLoading} users={users} projects={projects} />
      </div>
    </div>
  );
};
