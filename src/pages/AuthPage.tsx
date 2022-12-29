import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './AdminLoginStyles.css';
import { login, setToken } from '../features/authentication/redux/slice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { Navigate, redirect } from 'react-router-dom';
import { ADMIN_TIMELINE_PATH } from '../common/router/router';
import api from '../api/Api';
import { getTokenCookie, LOGIN_TOKEN_COOKIE, setTokenCookie } from '../common/utils/cookesUtils';

const bgImg = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/w4sA18JkULnlcgTLFSSk.jpg`;
const logo = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/KG8T5zPhoeZoRjVXyF5V.png`;

export const AuthPage: React.FC = () => {
    const path = window.location.pathname;
    const isAuthorized  = useAppSelector(state => state.authenticationReducer.isAuthenticated);
    const dispatch = useAppDispatch();

    console.log(path);
    useEffect(() => {
        if (!isAuthorized) {
            api.getTokenByCookie()
            .then(response => {
                if (response.data && response.data.role_id === 1) {
                    dispatch(login());
                    dispatch(setToken(getTokenCookie()));
                }
            })
            .catch(err => {
                
            });
        } 
    }, [path]);

    return (
        <>{ isAuthorized ?
            <Navigate to={ADMIN_TIMELINE_PATH} replace /> 
            :
            <div className='container-fluid' style={{
                background: `url("${bgImg}") no-repeat center center fixed`,
                backgroundSize: 'cover',
            }}>
                <div className='row'>
                    <div className='hidden-sm col-md-7 col-lg-8'>
                        <div className='col-sm-12 col-md-10 col-md-offset-2'>
                            <div className='logo-title-container'>
                                <img className='img-responsive pull-left flip logo hidden-xs animated fadeIn' src={logo} alt="Logo Icon" />
                                <div className='copy animated fadeIn'>
                                    <h1>THE DEEP VR</h1>
                                    <p>Booking system controll</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-4 login-sidebar">
                        <div className='login-container'>
                            <p> ВХОД В ПАНЕЛЬ УПРАВЛЕНИЯ </p>
                            <LogInForm/>
                        </div>
                    </div>
                </div>
            </div>
        }</>
    );
};

interface ILogInFormFields {
    email: string,
    password: string,
    remember?: boolean,
}

interface IError {
    message: string;
}

const LogInForm: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { 
            errors 
        },
    } = useForm<ILogInFormFields>();

    const [servErr, setServErr] = useState<IError|null>(null);
    const dispatch = useAppDispatch();

    const [redirect, setRedirect] = useState(false);

    const onSubmit: SubmitHandler<ILogInFormFields> = useCallback(({email, password, remember}, event) => {
        event?.preventDefault();
        // add remember
        setServErr(null);
        api.login({ email, password, remember: remember ?? false })
            .then((response) => {
                // console.log(response);

                if(response.status >= 200 && response.status < 300) { 
                    if (response.data.error === 0 ) {
                        if (response.data.user?.role_id === 1) {
                            setServErr(null);
                            dispatch(setToken(response.data.token));
                            dispatch(login());

                            if (remember)
                                setTokenCookie(response.data.token);
                            
                            setRedirect(true);
                        } else {
                            setServErr({ message: 'У вас недостаточно прав'});
                        }
                    } else {
                        // set error
                        setServErr({ message: response.data.error_text ?? ''});
                    }
                }
            })
            .catch((err: AxiosError) => {
                console.log(err);
                if(err.response) {
                    if(err.response.status === 404) 
                        setServErr({
                            message: 'Сервер не найден'
                        });
                    else 
                        setServErr({
                            message: 'Сервер не доступен, попробуйте позже'
                        });
                }
            });
    }, [setServErr, dispatch]);

    const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

    return (
        <>{ redirect ? 
            <Navigate to={ADMIN_TIMELINE_PATH} replace />
            :
            <form onSubmit={handleSubmit(onSubmit)}>
                {servErr && <p className='error-message'>{servErr.message}</p>}
                <br />
                
                <ErrorMessage 
                    errors={errors}
                    name="email"
                    render={({message}) => <p className='error-message'>{message}</p>}
                />
                <div className="form-group form-group-default" id="emailGroup">
                    <label>E-mail</label>
                    <div className="controls">
                        <input 
                            type='email' 
                            placeholder="E-mail" 
                            className="form-control" 
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Введите E-Mail'
                                }, 
                                pattern: { 
                                    value: emailRegex,
                                    message: 'Введите E-Mail'
                                }
                            })} 
                        />
                    </div>
                </div>
                
                <ErrorMessage 
                    errors={errors}
                    name="password"
                    render={({message}) => <p className='error-message'>{message}</p>}
                />
                <div className="form-group form-group-default" id="passwordGroup">
                    <label>Пароль</label>
                    <div className="controls">
                        <input 
                            type="password" 
                            placeholder="Пароль" 
                            className="form-control" 
                            {...register("password", { 
                                required: {
                                    value: true,
                                    message: 'Введите пароль'
                                }, 
                            })} 
                        />
                    </div>
                </div>

                <label className="form-group remember-me-group" id="rememberMeGroup">
                    <div className="controls">
                        <input 
                            type="checkbox" 
                            {...register("remember")} 
                            value={1}
                        />
                        <span className="remember-me-text">Запомнить меня</span>
                    </div>
                </label>

                <input type="submit" className="btn btn-block login-button signin" value='ВОЙТИ'/>
            </form>
        }</>
    );
};