import React from "react";
import {ProjectsList} from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectsListScreen = () => {
  return (
    <div className="dark:text-white">
      <div>
        <h1 className="py-2 mt-2 text-4xl font-semibold">项目列表</h1>
        <div className="pb-2">
          <SearchPanel />
        </div>
      </div>
      <ProjectsList />
    </div>
  );
};
