import AccountDropdown from "components/AccountDropdown";
import { useDarkTheme } from "./context/dark-context";

const AuthenticatedApp = () => {
  const darkTheme = useDarkTheme();

  return (
    <>
      <header className="bg-gray-200 dark:bg-gray-800">
        <div className="flex items-center justify-between p-2 px-3">
          <div className="dark:text-white">
            <a href="#"></a>
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
      <main className="h-screen"></main>
    </>
  );
};

export default AuthenticatedApp;
