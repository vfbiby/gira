import React from "react";
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
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <td className="w-1/10"></td>
            <td className="w-1/5">名称</td>
            <td className="w-1/5">部门</td>
            <td className="w-1/5">负责人</td>
            <td className="w-1/5">创建时间</td>
            <td className="w-1/10"></td>
          </tr>
        </thead>
      </table>
    </div>
  );
};
