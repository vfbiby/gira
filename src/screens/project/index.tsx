import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <>
      <div className="flex dark:text-white">
        <div className="w-48 shadow dark:bg-gray-700">
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
        <div className="w-full h-full p-2 ml-3 shadow dark:bg-gray-700">
          <Routes>
            <Route path="/kanban" element={<KanbanScreen />} />
            <Route path="/epic" element={<EpicScreen />} />
            <Navigate to={window.location.pathname + "/kanban"} />
          </Routes>
        </div>
      </div>
    </>
  );
};
