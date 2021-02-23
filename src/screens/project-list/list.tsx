import dayjs from "dayjs";
import { ProjectProps } from ".";
import { User } from "./search-panel";

export const ProjectsList = ({
  projects,
  users,
}: {
  projects: ProjectProps[] | null;
  users: User[] | null;
}) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="px-4 py-2 text-lg font-bold text-center">
          <td className="w-1/5 px-4 py-2">名称</td>
          <td className="w-1/5 px-4 py-2">部门</td>
          <td className="w-1/5 px-4 py-2">负责人</td>
          <td className="w-1/5 px-4 py-2">创建时间</td>
        </tr>
      </thead>
      <tbody>
        {projects?.map((project) => {
          return (
            <tr key={project.id} className="">
              <td className="px-4 py-2 border border-blue-500">{project.name}</td>
              <td className="px-4 py-2 border border-blue-500">{project.organization}</td>
              <td className="px-4 py-2 border border-blue-500">{users?.find(({ id }) => id === project.personId)?.name}</td>
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
  );
};
