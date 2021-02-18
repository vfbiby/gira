import React from "react";
import "./App.css";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);
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
            onClick={() => setDarkMode(!darkMode)}
          >
            Dark mode
          </button>
        </ul>
      )}
    </div>
  );
}

export default App;
