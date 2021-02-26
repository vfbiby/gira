import AccountDropdown from "components/AccountDropdown";
import React from "react";
import {
  Route,
  Routes,
  Link as RouterLink,
  LinkProps,
  useMatch,
} from "react-router-dom";
import { HomeScreen } from "screens/home";
import { ProjectScreen } from "screens/project";
import { ProjectsListScreen } from "screens/project-list";
import { useDarkTheme } from "./context/dark-context";

const AuthenticatedApp = () => {
  return (
    <>
      <PageHeader />
      <main className="h-screen p-2">
        <AppRouters />
      </main>
    </>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li className="px-2">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="px-2">
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/projects" element={<ProjectsListScreen />} />
      <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
    </Routes>
  );
};

const NavLink = (props: LinkProps) => {
  const match = useMatch(`${props.to}`);
  return (
    <RouterLink className={`${match ? "text-blue-600" : ""}`} {...props} />
  );
};

const PageHeader = () => {
  const darkTheme = useDarkTheme();

  return (
    <header className="shadow-lg dark:bg-gray-800">
      <div className="flex items-center justify-between p-2 px-3">
        <div className="dark:text-white">
          <Nav />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className={
              "focus:outline-none mx-2 h-6 w-6 text-white uppercase bg-gray-900 rounded-full left-5 top-4 dark:text-gray-900 dark:bg-white"
            }
            onClick={() => {
              darkTheme?.setDark(!darkTheme.isDark);
            }}
          >
            D
          </button>
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedApp;
