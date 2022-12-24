import { SubmitHandler, useForm } from 'react-hook-form';

import 'bootstrap/dist/css/bootstrap.css';
import './AdminLoginStyles.css';
import { ErrorMessage } from '@hookform/error-message';
import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const bgImg = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/w4sA18JkULnlcgTLFSSk.jpg`;
const logo = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/KG8T5zPhoeZoRjVXyF5V.png`;

export const AdminLogin: React.FC = () => {

    return (
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

    const onSubmit: SubmitHandler<ILogInFormFields> = useCallback(({email, password, remember}, event) => {
        event?.preventDefault();
        const apiPath = `/api/v2/auth/login`;
        axios.post(apiPath, {
            email,
            password
        })
            .then(response => {
                console.log(response);
                setServErr(null);
            })
            .catch((err: AxiosError) => {
                console.log(err);
                if(err.response) {
                    if(err.response.status === 404) 
                        setServErr({
                            message: 'Сервер не найден'
                        });
                }
            });
    }, [setServErr]);

    // console.log(window.location);

    const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

    return (
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
    );
};