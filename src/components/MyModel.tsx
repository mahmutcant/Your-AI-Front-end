import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getMyModels } from "../services/model-service";
import './MyModel.css'
function MyModel() {
    const [myModels,setMyModels] = useState<ModelNames[] | null>([]);
    useEffect(() => {
        async function getModelInfo() {
            const response = await getMyModels()
            setMyModels(response.data)
        }
        getModelInfo()
    }, [])
    const getAModel = (id:number) => {
        console.log(id)
    }
    return (
        <div>
            <Sidebar />
            <div className="card file-upload-card">
                <h1 className="text-black">Kayıtlı Modeller</h1>
                <div className="scrollable-content">
                <ul className="noselect my-list">
                    {myModels && Object.values(myModels).map((key,index) => (
                        
                        <li onClick={() => {getAModel(key.id)}} key={index}>
                            {key.modelSpecialName}
                            <br/>
                            Başarı Yüzdesi :  % {(key.accuracyValue * 100).toFixed(1)}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    )
}
export default MyModel;

