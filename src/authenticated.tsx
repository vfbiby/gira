import { useDarkTheme } from "./context/dark-context";
import { useAuth } from "./utils/hooks";

const AuthenticatedApp = () => {
    const { user } = useAuth();
    const darkTheme = useDarkTheme();

    return (
        <>
            <button
                type="button"
                className={
                    "absolute focus:outline-none h-8 w-8 text-white uppercase bg-gray-900 rounded-full left-5 top-4 dark:text-gray-900 dark:bg-white focu"
                }
                onClick={() => {
                    darkTheme?.setDark(!darkTheme.isDark);
                }}
            >
                D
            </button>
            <div className="dark:text-white">Welcome {user?.name}</div>
        </>
    );
};

export default AuthenticatedApp;
