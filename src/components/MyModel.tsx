import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getMyModels, predictModel } from "../services/model-service";
import './MyModel.css';
import './MainPage.css';
function MyModel() {
    const [myModels, setMyModels] = useState<ModelNames[] | null>([]);
    const [selectedModel, setSelectedModel] = useState<ModelNames>();
    const [inputValues, setInputValues] = useState<number[]>([]);
    const [result, setResult] = useState<number>();
    useEffect(() => {
        async function getModelInfo() {
            const response = await getMyModels()
            setMyModels(response.data)
        }
        getModelInfo()
    }, [])
    const getAModel = (id: number) => {
        const selected = myModels!.find((model) => model.id === id)
        setSelectedModel(selected)
        
    }
    const limitTextLength = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    const doPredict = async() => {
        const filteredArray = inputValues.filter(item => item !== undefined);
        const response = await predictModel(selectedModel!.modelName, filteredArray)
        setResult(response.message)
    }
    return (
        <div>
            <Sidebar />
            <div className="card file-upload-card">
                <h1 className="text-black">Kayıtlı Modeller</h1>
                <div className="scrollable-content">
                    <ul className="noselect my-list">
                        {myModels && Object.values(myModels).map((key, index) => (

                            <li onClick={() => { getAModel(key.id) }} key={index}>
                                {key.modelSpecialName}
                                <br />
                                Başarı Yüzdesi :  % {(key.accuracyValue * 100).toFixed(1)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="container csv-table-out">
                {selectedModel ? <section>
                    <h1>{selectedModel.modelSpecialName} Model Test Ekranı</h1>
                    <div className="tbl-header">
                        <table cellPadding={0} cellSpacing="0" border={0} >
                            <thead>
                                <tr>
                                    {Object.values(selectedModel.csvData).map((key, index) => (
                                        selectedModel.droppedColumns.includes(index) ? (
                                            null
                                        ) : (
                                            parseInt(selectedModel.selectedLabel) === index ? (
                                                <th>Sonuç Kolonu: <br />
                                                    <b>{limitTextLength(key, 8)}</b>
                                                </th>
                                            ) : (
                                                <th>{limitTextLength(key, 8)}</th>
                                            )
                                        )
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="tbl-content-out">
                        <table cellPadding="0" cellSpacing="0" border={0}>
                            <tbody>
                                <tr>
                                    {Object.values(selectedModel.csvData).map((key, index) => (
                                        selectedModel.droppedColumns.includes(index) ? (
                                            null
                                        ) :
                                        (
                                            parseInt(selectedModel.selectedLabel) === index ?
                                            <td><input className="form-control" readOnly  defaultValue={selectedModel.listOfLabels[result!]}/></td> :
                                            <td><input className="form-control"
                                                type="number"
                                                onChange={(e) => {
                                                    const newInputValues = [...inputValues];
                                                    newInputValues[index] = parseFloat(e.target.value);
                                                    setInputValues(newInputValues);
                                                }}
                                            /></td>
                                        )
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section> : <div></div>}
                <button className="btn btn-primary predict-button" onClick={() => { doPredict() }}>Tahmin</button>
            </div>

        </div>
    )
}
export default MyModel;

