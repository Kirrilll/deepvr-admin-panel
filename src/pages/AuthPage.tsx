import { Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { ADMIN_LOGIN_PATH, ADMIN_TIMELINE_PATH } from "../common/router/router";
import { login } from "../features/authentication/redux/slice";

const AuthPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => dispatch(login())}>Войти</Button>
            <Button onClick={() => navigate(ADMIN_TIMELINE_PATH)}>Таймлайн</Button>
            <Button onClick={() => navigate(ADMIN_LOGIN_PATH)}>log in page</Button>
        </>

    )
}

export default AuthPage;