import React from "react";
import {useLocation, Navigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const auth = useAuth()
    const location = useLocation()
    return auth.isAuthenticated === true ? children :  <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth