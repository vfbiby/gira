import { Spin } from "antd";
import React from "react";
import { useAuth } from "./utils/hooks";

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ "./authenticated")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated"));

export const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center w-full h-full text-center">
      <Spin size="large" />
    </div>
  );
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
