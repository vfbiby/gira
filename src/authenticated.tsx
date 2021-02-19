import { useAuth } from "./utils/hooks";

const AuthenticatedApp = () => {
    const user = useAuth();
    return <div>Welcome {user?.name}</div>;
};

export default AuthenticatedApp;
