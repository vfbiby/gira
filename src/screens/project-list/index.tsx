import React, { useEffect, useState } from "react";
import { client } from "utils/api-client";
import { useAsync } from "utils/use-async";
import { ProjectsList } from "./list";
import { Person, SearchPanel } from "./search-panel";

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

  const [persons, setUsers] = useState<Person[] | null>(null);

  useEffect(() => {
    client("/users").then(setUsers);
  }, []);

  return (
    <div className="dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold">项目列表</h1>
        <div className="pb-2">
          <SearchPanel users={persons} />
        </div>
      </div>
      <ProjectsList projects={projects} />
    </div>
  );
};
