import "./App.css";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();
  return (
    <div className="App">
        {user ? (
          <div>Welcome {user.name}</div>
        ) : (
          <ul className="text-gray-500">
            <li>Username</li>
            <li>Password</li>
          </ul>
        )}
    </div>
  );
}

export default App;
