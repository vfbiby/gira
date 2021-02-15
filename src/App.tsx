import "./App.css";
import { User } from "./context/auth-context";
import { useAuth } from "./utils/hooks";

function App() {
  const user: User | undefined = useAuth();
  return (
    <div className="App">
      {user ? (
        <div>Welcome {user.name}</div>
      ) : (
        <ul>
          <li>Username</li>
          <li>Password</li>
        </ul>
      )}
    </div>
  );
}

export default App;
