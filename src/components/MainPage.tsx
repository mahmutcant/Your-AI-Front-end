import { useEffect, useState } from "react";
import { validatorService } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function MainPage(){
    const navigate = useNavigate()
    const [message,setMessage] = useState<TokenModel | null>(null);
    useEffect(() => {
        validatorService()
            .then((data) => setMessage(data))
            .catch(err => {navigate("/")})
    }, []);
    
    return(
        
        <div className="App" style={{"background":"linear-gradiend"}}>
                <Sidebar/>
        </div>
    )
}
export default MainPage;