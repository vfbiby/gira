import React, { useEffect, useState } from "react";
import { client } from "utils/api-client";
import { useAsync } from "utils/use-async";
import { useDebounce } from "utils/use-debounce";
import { useProjects } from "utils/use-projects";
import { ProjectsList } from "./list";
import { User, SearchPanel } from "./search-panel";

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
  const [persons, setUsers] = useState<User[] | null>(null);
  const { data: projects, isLoading } = useProjects(debouncedValue);

  useEffect(() => {
    client("/users").then(setUsers);
  }, []);

  return (
    <div className="rounded dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold dark:text-white">
          项目列表
        </h1>
        <div className="pb-2">
          <SearchPanel
            param={param}
            setParam={setParam}
            users={persons || []}
          />
        </div>
      </div>
      <div className="p-10 mt-2 bg-blue-100 rounded-t-xl dark:bg-gray-800 ">
        <ProjectsList
          isLoading={isLoading}
          users={persons}
          projects={projects}
        />
      </div>
    </div>
  );
};
