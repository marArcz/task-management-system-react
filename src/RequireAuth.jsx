import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
    const { authed } = useAuth();

    return authed === true ? children : <Navigate to="/" replace />;
}