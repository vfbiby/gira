import React from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

function useAuth() {
  if (window.localStorage.getItem("__auth_provider_token"))
    return { id: 1, name: "bb", email: "3432@qq.com", token: "valid-token" };
  return;
}

function App() {
  const user: (User | undefined) = useAuth();
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
