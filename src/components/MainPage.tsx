import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Papa from 'papaparse';
function MainPage(){
    const navigate = useNavigate()
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
          if (file.type !== 'text/csv') {
            setErrorMessage('Lütfen sadece CSV dosyası seçin.');
            return;
          }
    
          try {
            const parsedData = await parseCsvFile(file);
            if (parsedData) {
              sendJsonDataToServer(parsedData);
            }
          } catch (error) {
            console.error('CSV dönüştürme hatası:', error);
          }
        }
      };
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
    return(
        <div className="App" style={{"background":"linear-gradiend"}}>
                <Sidebar/>
                <div className="card">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-center">
                        CSV Formatlı Veri
                    </div>
                    <div className="card-body">
                        <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                        <input className="form-control" type="file" accept=".csv" id="formFileMultiple" onChange={handleFileChange}/>
                        {errorMessage  && <p style={{"color":"red"}}>{errorMessage}</p>}
                    </div>
                </div>
        </div>
    )
}
export default MainPage;