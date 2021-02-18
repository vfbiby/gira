import "./App.css";
import { useDarkTheme } from "./context/dark-context";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();
  const darkTheme = useDarkTheme();

  return (
    <div className="dark:bg-gray-700 App">
      {user ? (
        <div>Welcome {user.name}</div>
      ) : (
        <ul className="text-gray-500 dark:text-white">
          <li>Username</li>
          <li>Password</li>
          <button
            type="button"
            className="px-2 py-1 rounded-lg"
            onClick={() => {
              darkTheme?.setDark(!darkTheme.isDark);
            }}
          >
            Dark mode
          </button>
        </ul>
      )}
    </div>
  );
}

export default App;
