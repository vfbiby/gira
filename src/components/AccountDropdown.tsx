import { useState } from "react";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="block object-cover w-8 h-8 overflow-hidden border-2 border-gray-600 rounded-full focus:border-white focus:outline-none"
      >
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80"
        />
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 w-48 py-2 mt-1 bg-white rounded-lg shadow-md`}
      >
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Account setting
        </a>
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Support
        </a>
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default AccountDropdown;
