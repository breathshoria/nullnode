import {ReactNode} from "react";
import {useLocation, Navigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
    children: ReactNode;
}

const RequireAuth = ({ children }: Props) => {
    const auth = useAuth();
    const location = useLocation();
    console.log(auth)
    if (auth?.isAuthenticated === true) {
        return <>{children}</>
    }
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth