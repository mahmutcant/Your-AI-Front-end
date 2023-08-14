import { useEffect, useState } from "react";
import 'fa-icons';
import { fetchUser, loginService, registerService } from "../services/user-service";
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function Login() {
    const { register: login, handleSubmit: handleSubmitLogin, formState: { errors: loginError } } = useForm<LoginModel>();
    const [isLogged, setIsLogged] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const navigate = useNavigate()
    const loginSubmit: SubmitHandler<LoginModel> = (data) => {
        loginService(data)
            .then(data => { localStorage.setItem("token", data.token); navigate('/main') }
            ).catch(err => {setWrongPassword(true)})
    };
    
    const closeAlert = () => {
        if(wrongPassword){
            return ""
        }else{
            return "none"
        }
    }
    return (
        <div className="App bodyBackGround" style={{ "overflowY": "hidden"}}>
            <div className="alert" style={{ visibility : wrongPassword ? "visible" : "hidden"}}>
                <span className="closebtn" onClick={() => {setWrongPassword(false)}}>&times;</span>
                Kullanıcı Adı veya Parola Hatalı
            </div>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login">
                            <div className="login__field">
                                <i className="login__icon fa-solid fa-user"></i>
                                <input type="text" className="login__input" {...login('username', { required: true })} placeholder="Kullanıcı Adı" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" {...login('password', { required: true })} className="login__input" placeholder="Parola" />
                            </div>
                            <button className="button login__submit" onClick={handleSubmitLogin(loginSubmit)}>
                                <span className="button__text">Giriş Yap</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                        <div className="social-login">
                            <h6>Hesabın Yok Mu ?</h6>
                            <div className="social-icons">
                                <a className="register-link" href="/register">Kayıt Ol</a>
                            </div>
                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;