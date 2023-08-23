import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Papa from 'papaparse';
import './MainPage.css';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from "react-hook-form";
function MainPage() {
    const navigate = useNavigate()
    const { register: prepareModelForm, handleSubmit: handleprepareModelForm, formState: { errors: prepareModelFormError } } = useForm<PrepareModelDTO>();
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [csvDataName, setCsvDataName] = useState<string>();
    const [isModelOpen,setIsModelOpen] = useState<boolean>(false);
    const [epochCounter, setEpochCounter] = useState<number>(0);
    const changeEpochCounter = (event:any) => {
        setEpochCounter(event.target.value)
    }
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setCsvDataName(file.name)
            if (file.type !== 'text/csv') {
                setErrorMessage('Lütfen sadece CSV dosyası seçin.');
                return;
            }

            try {
                const parsedData = await parseCsvFile(file);
                if (parsedData) {
                    setCsvData(parsedData)
                    localStorage.setItem('selectedcsv', JSON.stringify(parsedData))
                    localStorage.setItem('selectedcsvName', file.name)
                }
            } catch (error) {
                console.error('CSV dönüştürme hatası:', error);
            }
        }
    };
    useEffect(() => {
        const storedCsvData = localStorage.getItem("selectedcsv")
        const storedCsvName = localStorage.getItem("selectedcsvName")
        if (storedCsvData && storedCsvName) {
            setCsvData(JSON.parse(storedCsvData))
            setCsvDataName(storedCsvName)
        }
    }, [])
    const prepareModel : SubmitHandler<PrepareModelDTO> = (data) => {
        console.log(data)
    }
    const parseCsvFile = (file: File): Promise<string[][]> => {
        return new Promise((resolve) => {
            Papa.parse(file, {
                complete: (result) => {
                    const parsedData: string[][] = result.data as string[][];
                    resolve(parsedData);
                },
            });
        });
    };
    const limitTextLength = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    const sendJsonDataToServer = (jsonData: string[][]) => {

    };
    return (
        <div className="App" style={{ "background": "linear-gradiend"}}>
            <Sidebar />
            <div className="card file-upload-card">
                <div className="card-header bg-transparent border-0 d-flex justify-content-center">
                    Veri Seti Yükleme Alanı
                </div>
                <div className="card-body">
                    <label htmlFor="formFileMultiple" className="form-label">CSV dosyası yükleyin</label>
                    <input className="form-control" type="file" accept=".csv" id="formFileMultiple" onChange={handleFileChange} disabled={isModelOpen}/>
                    {errorMessage && <p style={{ "color": "red" }}>{errorMessage}</p>}
                </div>
                <div className="card-footer">
                    <button className="btn btn-lg btn-primary train-button"
                    onClick={() => {setIsModelOpen(true)}}
                    disabled={csvData.length > 0 ? false:true}
                    >Modeli Eğit</button>
                </div>
            </div>
            <div className="container csv-table">
                <div className="row">
                    {csvData.length > 0 ? <section >
                        <h1>{csvDataName?.replace('.csv', "")} Veri Seti</h1>
                        <div className="tbl-header">
                            <table cellPadding={0} cellSpacing="0" border={0} >
                                <thead>
                                    <tr>
                                        {csvData.length > 0 && csvData[0].map((header, index) => (
                                            <th key={index} title={header}>{limitTextLength(header, 10)}</th>
                                        ))}
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content" style={{"overflow": isModelOpen ? "hidden":"revert-layer"}}>
                            <table cellPadding="0" cellSpacing="0" border={0}>
                                <tbody>
                                    {csvData.slice(1).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Object.values(row).map((cell, cellIndex) => (
                                                <td key={cellIndex} title={cell}>{limitTextLength(cell, 8)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section> : <div></div>}
                </div>
            </div>
            <Modal
            isOpen={isModelOpen}
            contentLabel="Pop-up Menü"
            className="custom-modal"
            overlayClassName="custom-overlay">
                <div className="card m-4">
                    <div className="card-header">
                        Model Eğitimi
                    </div>
                    <div className="card-body">
                        Sınıflandırma Yapılacak Kolonu Seçin
                        <select className="form-select mb-3" {...prepareModelForm('selectedClass')} aria-label="Default select example">
                            {csvData[0] && Object.values(csvData[0]).map((key,index) => (
                                <option key={index}>{key}</option>
                            ))}
                        </select>
                        <div className="row">
                            <label htmlFor="formControlRange">Epoch sayısı</label>
                            <input type="range" {...prepareModelForm('epochNumber')} onChange={(e) => {changeEpochCounter(e)}} min={10} max={200} className="form-control-range" id="formControlRange"/>
                            <center>{epochCounter}</center>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleprepareModelForm(prepareModel)()}>Kaydet</button>
                </div>
                <button className="btn btn-primary mb-3 w-75" onClick={() => {setIsModelOpen(false)}}>Kapat</button>
            </Modal>
        </div>
    )
}
export default MainPage;