import { PageLoading } from "components/page-loading";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/use-projects";
import { ProjectProps } from ".";
import { User } from "./search-panel";

export const ProjectsList = ({
  projects,
  users,
  isLoading,
}: {
  projects: ProjectProps[] | null;
  users: User[] | null;
  isLoading: boolean;
}) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <div className="relative">
      <PageLoading isLoading={isLoading} />
      <table className="w-full table-fixed">
        <thead>
          <tr className="px-4 py-2 text-lg font-bold text-center">
            <td className="flex items-center justify-center px-4 py-2">
              <Pin checked={true} disabled={true} className="w-8 h-8" />
            </td>
            <td className="w-1/5 px-4 py-2">名称</td>
            <td className="w-1/5 px-4 py-2">部门</td>
            <td className="w-1/5 px-4 py-2">负责人</td>
            <td className="w-1/5 px-4 py-2">创建时间</td>
            <td className="px-4 py-2"></td>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => {
            return (
              <tr key={project.id} className="">
                <td className="px-4 py-2 border border-blue-500">
                  <div className="flex items-center justify-center">
                    <Pin
                      checked={project.pin}
                      onChange={pinProject(project.id)}
                      className="w-8 h-8"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border border-blue-500">
                  <Link to={`${project.id}`}>{project.name}</Link>
                </td>
                <td className="px-4 py-2 border border-blue-500">
                  {project.organization}
                </td>
                <td className="px-4 py-2 border border-blue-500">
                  {
                    users?.find(({ id }) => id === Number(project.personId))
                      ?.name
                  }
                </td>
                <td className="px-4 py-2 border border-blue-500">
                  {project.created
                    ? dayjs(project.created).format("YYYY-MM-DD")
                    : "null"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
