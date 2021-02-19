import React from "react";
import { useAuth } from "./utils/hooks";

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ "./authenticated")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated"));

const FullPageSpinner = () => {
  return <div className="absolute inset-0 z-10">loading</div>;
};

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <div className="dark:bg-gray-900">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </React.Suspense>
  );
}

export default App;
