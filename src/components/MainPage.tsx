import { useEffect, useState ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
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
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [epochCounter, setEpochCounter] = useState<number>(10);
    const [dropoutCounter, setDropoutCounter] = useState<number>(0);
    const [interlayers, setInterlayers] = useState<InterlayerModel[]>([]);
    const inputNeuronNumber = useRef<HTMLInputElement | null>(null);
    const changeDropoutValue = (event: any) => {
        setDropoutCounter(event.target.value)
    }
    const changeEpochCounter = (event: any) => {
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
    const addInterlayer = () => {
        const data:InterlayerModel = {
            dropoutNumber : dropoutCounter / 100,
            neuronNumber : Number.isNaN(parseInt(inputNeuronNumber.current!.value)) ? 32 : parseInt(inputNeuronNumber.current!.value)
        }
        setInterlayers(prevInterlayer => [...prevInterlayer, data])
    }
    useEffect(() => {
        console.log(interlayers)
    },[interlayers])
    useEffect(() => {
        const storedCsvData = localStorage.getItem("selectedcsv")
        const storedCsvName = localStorage.getItem("selectedcsvName")
        if (storedCsvData && storedCsvName) {
            setCsvData(JSON.parse(storedCsvData))
            setCsvDataName(storedCsvName)
        }
    }, [])
    const prepareModel: SubmitHandler<PrepareModelDTO> = (data) => {
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
        <div className="App" style={{ "background": "linear-gradiend" }}>
            <Sidebar />
            <div className="card file-upload-card">
                <div className="card-header bg-transparent border-0 d-flex justify-content-center">
                    Veri Seti Yükleme Alanı
                </div>
                <div className="card-body">
                    <label htmlFor="formFileMultiple" className="form-label">CSV dosyası yükleyin</label>
                    <input className="form-control" type="file" accept=".csv" id="formFileMultiple" onChange={handleFileChange} disabled={isModelOpen} />
                    {errorMessage && <p style={{ "color": "red" }}>{errorMessage}</p>}
                </div>
                <div className="card-footer">
                    <button className="btn btn-lg btn-primary train-button"
                        onClick={() => { setIsModelOpen(true) }}
                        disabled={csvData.length > 0 ? false : true}
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
                        <div className="tbl-content" style={{ "overflow": isModelOpen ? "hidden" : "revert-layer" }}>
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
                <div className="container">
                    <div className="col m-2">
                        <div className="card train-property-card">
                            Sınıflandırma Yapılacak Kolonu Seçin
                            <select className="form-select" {...prepareModelForm('selectedClass')} aria-label="Default select example">
                                {csvData[0] && Object.values(csvData[0]).map((key, index) => (
                                    <option key={index}>{key}</option>
                                ))}
                            </select>
                            <div className="row">
                                <label htmlFor="formControlRange">Epoch sayısı</label>
                                <input type="range" {...prepareModelForm('epochNumber')} onChange={(e) => { changeEpochCounter(e) }} min={10} max={200} className="form-control-range" defaultValue={10} id="formControlRange" />
                                <center>{epochCounter}</center>
                            </div>
                            <h4 className="d-flex justify-content-center">Ara Katman</h4>
                            <label htmlFor="numberOfNeuron">Nöron Sayısı</label><input id="numberOfNeuron" ref={inputNeuronNumber} className="form-control" type="number"/>
                            <label htmlFor="numberOfDropdown">Dropout</label><input className="form-control" defaultValue={0} onChange={(e) => changeDropoutValue(e)} step={10} min={0} max={100} type="range" />
                            <center>{dropoutCounter / 100}</center>
                            <i onClick={() => addInterlayer()} id="interlayer-plus-icon" className="fa-solid fa-circle-plus"></i>
                        </div>
                        <button className="mt-3 btn btn-primary w-100" onClick={() => { setIsModelOpen(false) }}>Kapat</button>
                    </div>
                    <div className="col m-2">
                        <div className="card">
                            Ara Katmanlar
                            <div className="card-body ">
                                <ul className="list-group"  style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {interlayers && Object.values(interlayers).map(key => (
                                       <li className="list-group-item">Dropout : {key.dropoutNumber} Nöron: {key.neuronNumber}</li> 
                                    ))}
                                </ul>
                            </div>
                            <button className="btn btn-primary" onClick={() => handleprepareModelForm(prepareModel)()}>Eğitimi başlat</button>
                        </div>
                    </div>
                </div>
                
            </Modal>
        </div>
    )
}
export default MainPage;