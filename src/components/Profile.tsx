import { useSelector } from "react-redux"
import { AppState } from "../store/types"
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import './Profile.css'
function Profile() {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate()
    return (
        <div className="App" style={{ "background": "linear-gradiend" }}>
            <Sidebar />
            <div className="card">
                <div className="card-content">
                    <div className="card-item">
                        <div className="card-key">Ad:</div>
                        <div className="card-value">{user?.name}</div>
                    </div>
                    <div className="card-item">
                        <div className="card-key">Soyad:</div>
                        <div className="card-value">{user?.surname}</div>
                    </div>
                    <div className="card-item">
                        <div className="card-key">Kullanıcı Adı:</div>
                        <div className="card-value">{user?.username}</div>
                    </div>
                    <div className="card-item">
                        <div className="card-key">E-mail:</div>
                        <div className="card-value">{user?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile