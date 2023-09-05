import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getMyModels } from "../services/model-service";

function MyModel() {
    const [myModels,setMyModels] = useState<ModelNames[] | null>([]);
    useEffect(() => {
        async function getModelInfo() {
            const response = await getMyModels()
            setMyModels(response.data)
        }
        getModelInfo()
    }, [])
    return (
        <div>
            <Sidebar />
            <div className="card file-upload-card">
                <h1 className="text-black">Kayıtlı Modeller</h1>
                <ul>
                    {myModels && Object.values(myModels).map((key,index) => (
                        
                        <li>{key.modelSpecialName}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default MyModel;

