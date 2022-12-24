import { useForm } from 'react-hook-form';

import 'bootstrap/dist/css/bootstrap.css';
import './AdminLoginStyles.css';

const bgImg = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/w4sA18JkULnlcgTLFSSk.jpg`;
const logo = `https://srt.vrbook.creatrix-digital.ru/storage/settings/March2021/KG8T5zPhoeZoRjVXyF5V.png`;

export const AdminLogin: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data); 

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
                        <form onSubmit={onSubmit} method='POST'>
                            <div className="form-group form-group-default" id="emailGroup">
                                <label>E-mail</label>
                                <div className="controls">
                                    <input type="text" name="email" id="email" value="" placeholder="E-mail" className="form-control" required />
                                </div>
                            </div>
                            
                            <div className="form-group form-group-default" id="passwordGroup">
                                <label>Пароль</label>
                                <div className="controls">
                                    <input type="password" name="password" placeholder="Пароль" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group" id="rememberMeGroup">
                                <div className="controls">
                                    <input type="checkbox" name="remember" id="remember" value="1" />
                                    <label htmlFor="remember" className="remember-me-text">Запомнить меня</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-block login-button">
                                <span className="signin">ВОЙТИ</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};