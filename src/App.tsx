import React, { useContext } from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = React.createContext<User | undefined>(undefined);

function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

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
