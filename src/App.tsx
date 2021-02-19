import React from "react";
import AuthenticatedApp from "./authenticated";
import UnauthenticatedApp from "./unauthenticated";
import { useAuth } from "./utils/hooks";

function App() {
  const user = useAuth();

  return (
    <div className="dark:bg-gray-900">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
