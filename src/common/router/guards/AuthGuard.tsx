import React, { useEffect } from "react";
import { Navigate } from "react-router";
import api from "../../../api/Api";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { login, setToken } from "../../../features/authentication/redux/slice";
import { getTokenCookie } from "../../utils/cookesUtils";
import { AUTH_PATH } from "../router";

interface GuardProps {
    element: React.ReactElement,
}

const AuthGuard: React.FC<GuardProps> = ({ element }) => {
    const path = window.location.pathname;
    const isAuthorized  = useAppSelector(state => state.authenticationReducer.isAuthenticated);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuthorized) {
            api.getTokenByCookie()
            .then(response => {
                if (response.data && response.data.role_id === 1) {
                    dispatch(login());
                    dispatch(setToken(getTokenCookie()));
                }
            })
            .catch(err => {});
        } 
    }, [path]);
    
    return (
        isAuthorized
            ? element
            : <Navigate to={AUTH_PATH} replace />
    );
};

export default AuthGuard;