import { useParams } from "react-router-dom";

export const ProjectScreen = () => {
  const { projectId } = useParams();
  return <h1 className="dark:text-white">ProjectScreen {projectId}</h1>;
};
