import { useDocumentTitle } from "utils/use-documentTitle";

export const HomeScreen = () => {
  useDocumentTitle("HomeScreen");
  return <h1 className="dark:text-white">HomeScreen</h1>;
};
