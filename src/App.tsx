import { FullPageSpinner } from "components/full-page";
import React from "react";
import { useAuth } from "./utils/hooks";

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ "./authenticated")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated"));

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <div className="dark:bg-gray-900">
        {user && user.name ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </React.Suspense>
  );
}

export default App;
