import { useSelector } from "react-redux"
import { AppState } from "../store/types"
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import { SubmitHandler, useForm } from "react-hook-form";
function Profile() {
    const { register: saveChanges, handleSubmit: handleSubmitRegister, formState: { errors: registerError } } = useForm<User>();
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate()
    const saveChangesSubmit: SubmitHandler<User> = (data) => {
        //registerService(data)
        if(data.name === ""){
            data.name = user!.name
        }
        if(data.surname === ""){
            data.surname = user!.surname
        }
        if(data.username === ""){
            data.username = user!.username
        }
        if(data.email === ""){
            data.email = user!.email
        }
        console.log(data)
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
                    <button className="btn btn-primary save_button" onClick={() => handleSubmitRegister(saveChangesSubmit)()}>Değişiklikleri Kaydet</button>
                </div>
            </div>
        </div>
    )
}
export default Profile