
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLogin } from '../../Components/AdminLogin/AdminLogin';
import AuthPage from '../../pages/AuthPage';
import TimelinePage from '../../pages/TimelinePage';
import AuthGuard from './guards/AuthGuard';

export const ADMIN_TIMELINE_PATH = '/admin-timeline';
export const AUTH_PATH = '/auth';
export const ADMIN_LOGIN_PATH = '/admin-login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthGuard element={<Navigate to={ADMIN_TIMELINE_PATH} replace/>}/> ,
    },
    {
        path: AUTH_PATH,
        element: <AuthPage />
    },
    {
        path: ADMIN_TIMELINE_PATH,
        element: <AuthGuard element={<TimelinePage />} />,
    },
    {
        path: ADMIN_LOGIN_PATH,
        element: <AdminLogin />,
    }
])
