import AccountDropdown from "components/AccountDropdown";
import { useDarkTheme } from "./context/dark-context";
import { useAuth } from "./utils/hooks";

const AuthenticatedApp = () => {
  const { user } = useAuth();
  const darkTheme = useDarkTheme();

  return (
    <>
      <header className="bg-gray-200 ">
        <div className="flex items-center justify-between p-2 px-3">
          <div>
            <a href="#">项目</a>
          </div>
          <AccountDropdown />
        </div>
      </header>
      <main className="h-screen">
        <button
          type="button"
          className={
            "focus:outline-none h-8 w-8 text-white uppercase bg-gray-900 rounded-full left-5 top-4 dark:text-gray-900 dark:bg-white focu"
          }
          onClick={() => {
            darkTheme?.setDark(!darkTheme.isDark);
          }}
        >
          D
        </button>
        <div className="dark:text-white">Welcome {user?.name}</div>
      </main>
    </>
  );
};

export default AuthenticatedApp;
