import { useEffect, useState } from "react";
import { useAuth } from "utils/hooks";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Esc" || e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="dark:text-white">
          Welcome,{" "}
          <span className="font-semibold uppercase tracking">{user?.name}</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="relative z-10 block object-cover w-8 h-8 ml-2 overflow-hidden border-2 border-gray-600 rounded-full focus:border-white focus:outline-none"
        >
          <img
            className="object-cover w-full h-full"
            src={`${
              user?.avator_url
                ? user?.avator_url
                : "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80"
            }`}
          />
        </button>
      </div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 w-full cursor-default h-full bg-black opacity-30`}
      ></button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute dark:bg-gray-800 right-0 w-48 py-2 mt-1 bg-white rounded-lg shadow-md`}
      >
        <a
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Account setting
        </a>
        <a
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Support
        </a>
        <a
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
          className="block px-4 py-2 dark:text-white text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default AccountDropdown;
