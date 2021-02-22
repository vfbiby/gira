import React, { useEffect } from "react";
import { client } from "utils/api-client";
import { useAsync } from "utils/use-async";
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
  const { data: projects, run } = useAsync<ProjectProps[] | null>();
  useEffect(() => {
    run(client("/projects"));
  }, []);
  return (
    <div className="dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold">项目列表</h1>
        <div className="pb-2">
          <SearchPanel />
        </div>
      </div>
      <ProjectsList projects={projects} />
    </div>
  );
};
