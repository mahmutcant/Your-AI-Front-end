import { useSelector } from "react-redux"
import { AppState } from "../store/types"
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import Modal from 'react-modal';
import { SubmitHandler, useForm } from "react-hook-form";
import { changePassword, updateUserInfo } from "../services/user-service";
import { useState } from "react";
function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePasswordAlert, setChangePasswordAlert] = useState(0);
    const { register: saveChanges, handleSubmit: handleSubmitRegister, formState: { errors: registerError } } = useForm<User>();
    const { register: savePasswordChanges, handleSubmit: handlePasswordChange, formState: { errors: changePasswordError } } = useForm<PasswordModel>();
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const savePasswordChangesSubmit: SubmitHandler<PasswordModel> = (data) => {
        try{
            changePassword(data)
        }catch(err){
            
        }
    }
    const saveChangesSubmit: SubmitHandler<User> = (data) => {
        //registerService(data)
        if (data.name === "") {
            data.name = user!.name
        }
        if (data.surname === "") {
            data.surname = user!.surname
        }
        if (data.username === "") {
            data.username = user!.username
        }
        if (data.email === "") {
            data.email = user!.email
        }
        try {
            updateUserInfo(data)
            window.location.reload()
        } catch {
            navigate("/")
        }
    }
    return (
        <div className="App" style={{ "background": "linear-gradiend" }}>
            <Sidebar />
            <div className="card">
                <div className="card-content">
                    <div className="card-item">
                        <div className="card-key">Ad:</div>
                        <input className="card-value" defaultValue={user?.name}
                            {...saveChanges('name')} />
                    </div>
                    <div className="card-item">
                        <div className="card-key">Soyad:</div>
                        <input className="card-value" defaultValue={user?.surname}
                            {...saveChanges('surname')} />
                    </div>
                    <div className="card-item">
                        <div className="card-key">Kullanıcı Adı:</div>
                        <input className="card-value" defaultValue={user?.username}
                            {...saveChanges('username')} />
                    </div>
                    <div className="card-item">
                        <div className="card-key">E-mail:</div>
                        <input className="card-value" defaultValue={user?.email}
                            {...saveChanges('email')} />
                    </div>
                    <button className="btn btn-warning save_button" onClick={openModal}>Parola değiştir</button>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Pop-up Menü"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                    >
                        <div className="card alert-card" style={{"visibility": changePasswordAlert === 2 ? "visible" : "hidden"}}>Hatalı Şifre Girdiniz</div>
                        <div className="card alert-card" style={{"visibility": changePasswordAlert === 1 ? "visible" : "hidden"}}>Şifreler Uyuşmamaktadır</div>
                        <input className="form-control modal-input" type="password"
                            {...savePasswordChanges('oldPassword' , { required: true, minLength:4})} placeholder="Şifreniz" />
                            {changePasswordError.oldPassword && (
                                    <span>Geçersiz Şifre Tekrarı</span>
                                )}
                        <input className="form-control modal-input" type="password"
                            {...savePasswordChanges('newPassword', { required: true, minLength:4})} placeholder="Yeni Şifreniz"/>
                            {changePasswordError.newPassword && (
                                    <span>Geçersiz Şifre Tekrarı</span>
                                )}
                        <input className="form-control modal-input" type="password"
                            {...savePasswordChanges('newPasswordRepeat', { required: true, minLength:4})}
                            placeholder="Yeni Şifre Tekrarı"/>
                            {changePasswordError.newPasswordRepeat && (
                                    <span>Geçersiz Şifre Tekrarı</span>
                                )}
                        <button className="btn btn-success save_button popup_button" style={{ "width": "90%" }}
                        onClick={() => handlePasswordChange(savePasswordChangesSubmit)()}>Değişiklikleri Kaydet</button>
                        <button className="btn btn-primary save_button popup_button" style={{ "width": "90%", "marginBottom":"30px"}} onClick={closeModal}>Kapat</button>
                    </Modal>
                    <button className="btn btn-primary save_button" onClick={() => handleSubmitRegister(saveChangesSubmit)()}>Değişiklikleri Kaydet</button>
                </div>
            </div>
        </div>
    )
}
export default Profile