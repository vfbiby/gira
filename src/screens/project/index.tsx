import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <>
      <h1 className="dark:text-white">ProjectScreen</h1>
      <div className="flex dark:text-white">
        <div className="w-48 dark:bg-gray-700">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-500">
              <Link to="kanban">
                <span className="block w-full h-full">看板</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-500">
              <Link to="epic">
                <span className="block w-full h-full">任务组</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dark:bg-gray-500 h-full w-full">
          <span>thiskd</span>
          <Routes>
            <Route path="/kanban" element={<KanbanScreen />} />
            <Route path="/epic" element={<EpicScreen />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
