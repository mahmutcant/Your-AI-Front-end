import { useEffect, useState } from "react";
import { validatorService } from "../services/user-service";
import { stringify } from "querystring";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

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
             <Layout>
             {message && <p>{message.message}</p>}
             </Layout>
        </div>
    )
}
export default MainPage;