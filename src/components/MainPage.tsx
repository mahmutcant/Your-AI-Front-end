import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Papa from 'papaparse';
import './MainPage.css'
function MainPage() {
    const navigate = useNavigate()
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [csvDataName, setCsvDataName] = useState<string>();
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
                    sendJsonDataToServer(parsedData);
                }
            } catch (error) {
                console.error('CSV dönüştürme hatası:', error);
            }
        }
    };
    useEffect(() => {
        const storedCsvData = localStorage.getItem("selectedcsv")
        const storedCsvName = localStorage.getItem("selectedcsvName")
        if(storedCsvData && storedCsvName){
            setCsvData(JSON.parse(storedCsvData))
            setCsvDataName(storedCsvName)
        }
    }, [])
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

        /*fetch('/your-server-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => {
          })
          .catch((error) => {
          });*/
        console.log(jsonData)
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
                    <input className="form-control" type="file" accept=".csv" id="formFileMultiple" onChange={handleFileChange} />
                    {errorMessage && <p style={{ "color": "red" }}>{errorMessage}</p>}
                </div>
            </div>
            {csvData.length > 0 ? <section>
                <h1>{csvDataName?.replace('.csv', "")}</h1>
                <div className="tbl-header">
                    <table cellPadding={0} cellSpacing="0" border={0}>
                        <thead>
                            <tr>
                                {csvData.length > 0 && csvData[0].map((header, index) => (
                                    <th key={index} title={header}>{limitTextLength(header, 10)}</th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
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

        </div >
    )
}
export default MainPage;