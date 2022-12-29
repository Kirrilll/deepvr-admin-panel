import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../../app/store";
import { AUTH_PATH } from "../router";

interface GuardProps {
    element: React.ReactElement,
}

const AuthGuard: React.FC<GuardProps> = ({ element }) => {
    const isAuthorized  = useAppSelector(state => state.authenticationReducer.isAuthenticated);
    return (
        isAuthorized
            ? element
            : <Navigate to={AUTH_PATH} replace />
    );
}

export default AuthGuard;