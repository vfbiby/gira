import React from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

function App({ user }: { user?: User }) {
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
