import { useProjectModal } from "./utils";

export const ProjectModel = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <div
      className={`${
        projectModalOpen ? "block" : "hidden"
      } fixed inset-0 flex z-50 items-center bg-black bg-opacity-50 justify-center w-full h-full`}
    >
      <div className="w-3/5 bg-gray-800 opacity-100 h-3/5">
        <div className="relative block">
          <div className="flex justify-center title">
            <h1 className="dark:text-white">Project Modal</h1>
            <button className="absolute top-2 right-3" onClick={close}>
              X
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
