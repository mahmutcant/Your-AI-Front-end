import { SubmitHandler, useForm } from 'react-hook-form';
import './Register.css';
import { error } from 'console';
import { registerService } from '../services/user-service';
function Register() {
    const { register: register, handleSubmit: handleSubmitRegister, formState: { errors: registerError } } = useForm<User>();
    const registerSubmit: SubmitHandler<User> = (data) => {
        if (data.password === data.passwordRepeat) {
            registerService(data)
        } else {
            console.log(data)
        }
    }
    return (
        <div className='App' style={{ "overflowY": "hidden" }}>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="register">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" {...register('username', { required: true, maxLength: 20 })} placeholder="Kullanıcı Adı" />
                            </div>
                            {registerError.username && (
                                    <span>Geçersiz Kullanıcı Adı</span>
                                )}
                            <div className="login__field">
                            <i className="login__icon fa-solid fa-envelope-open"></i>
                                <input type="email"
                                id='txtEmail'
                                    {...register('email', {
                                        required: true,
                                        validate: {
                                            maxLength: (v) =>
                                                v.length <= 50 || "E posta en fazla 50 karakter uzunluğunda olmalıdır",
                                            matchPattern: (v) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                                "Lütfen Geçerli bir E-posta giriniz!",
                                        },
                                    })}
                                    className="login__input"
                                    placeholder="E-Posta" />
                            </div>
                            {registerError.email && (
                                    <span>Geçersiz E-Posta</span>
                                )}
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" 
                                {...register('password', { required: true })} 
                                className="login__input" 
                                placeholder="Parola" />
                            </div>
                            {registerError.password && (
                                    <span>Geçersiz Şifre</span>
                                )}
                            <div className="login__field passwordchecker">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" {...register('passwordRepeat', { required: true })} className="login__input" placeholder="Parola" />
                            </div>
                            {registerError.passwordRepeat && (
                                    <span>Geçersiz Şifre Tekrarı</span>
                                )}
                            <button className="button login__submit" onClick={handleSubmitRegister(registerSubmit)}>
                                <span className="button__text">Kayıt Ol</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                            <div className="social-login tologin">
                                <h6>Zaten Hesabın Var Mı ?</h6>
                                <div className="social-icons">
                                    <a className="register-link" href="/">Giriş Yap</a>
                                </div>
                            </div>
                        </form>
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
export default Register;