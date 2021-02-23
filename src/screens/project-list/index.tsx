import React, { useEffect, useState } from "react";
import { client } from "utils/api-client";
import { useAsync } from "utils/use-async";
import { useDebounce } from "utils/use-debounce";
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
  const { data: projects, run } = useAsync<ProjectProps[] | null>();

  useEffect(() => {
    run(client("/projects", { data: param }));
  }, [debouncedValue]);

  useEffect(() => {
    client("/users").then(setUsers);
  }, []);

  return (
    <div className="dark:text-white">
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
      <ProjectsList users={persons} projects={projects} />
    </div>
  );
};
