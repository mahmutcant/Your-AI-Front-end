import { useEffect, useState } from "react";
import { validatorService } from "../services/user-service";
import { stringify } from "querystring";
import { useNavigate } from "react-router-dom";

function MainPage(){
    const navigate = useNavigate()
    const [message,setMessage] = useState<TokenModel | null>(null);
    useEffect(() => {
        validatorService()
            .then((data) => setMessage(data))
            .catch(err => {navigate("/")})
    }, []);
    return(
        <div className="App">
             {message && <p>{message.message}</p>}
        </div>
    )
}
export default MainPage;