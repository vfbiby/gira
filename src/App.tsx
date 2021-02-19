import React from "react";
import "./App.css";
import UnauthenticatedApp from "./unauthenticated";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();

  return (
    <div className="dark:bg-gray-900">
      {user ? <div>Welcome {user.name}</div> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
