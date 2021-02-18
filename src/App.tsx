import "./App.css";
import { useTheme } from "./context/dark-context";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();
  const theme = useTheme();

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
              theme?.setDark(!theme.isDark);
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
