import dayjs from "dayjs";
import { ProjectProps } from ".";
import { Person } from "./search-panel";

export const ProjectsList = ({
  projects,
  users,
}: {
  projects: ProjectProps[] | null;
  users: Person[] | null;
}) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="text-lg border-b-2">
          <td className="w-1/10"></td>
          <td className="w-1/5">名称</td>
          <td className="w-1/5">部门</td>
          <td className="w-1/5">负责人</td>
          <td className="w-1/5">创建时间</td>
          <td className="w-1/10"></td>
        </tr>
      </thead>
      <tbody>
        {projects?.map((project) => {
          return (
            <tr key={project.id} className="border-b-2">
              <td></td>
              <td className="py-2">{project.name}</td>
              <td>{project.organization}</td>
              <td>{users?.find(({ id }) => id === project.personId)?.name}</td>
              <td>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "null"}
              </td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
