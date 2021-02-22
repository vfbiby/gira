import { ProjectProps } from ".";

export const ProjectsList = ({
  projects,
}: {
  projects: ProjectProps[] | null;
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
              <td>{project.personId}</td>
              <td>{project.created}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
