import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function CandidateReport() {
    const {id} = useParams();
    //console.log(id);
    const [Candidatedata, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getReport() {
            const url = "http://localhost:4000/getcandidatereport";
            const { data } = await axios.post(url, { candidateId: id });
            //console.log(data);
            setData(data);
            setLoading(false);

        }
        getReport();
    }
    ,[]);

    return(
        <div >
        <Navbar />
        <div className="flex ">
          
          <div className="bg-white w-1/4 ">
           <Sidebar />
          </div>
          <div className=" w-3/4 p-2" >
            <div>
            <h1 className="text-2xl font-bold">Candidate Report</h1>
            {!loading && (
              <div>
                <h1 className="text-xl m-3">candidate email : {Candidatedata.candidate}</h1>
              
              <p className="font-bold text-2xl">Total Score: {Candidatedata.totalScore}</p>
              <h1 className="font-bold m-3 text-xl">Responses Given by the candidate</h1>
              <div className="bg-gray-200">
              {Candidatedata.responses.map((response, index) => (
                <div key={index} className="border p-2 m-2">
                  <p className="font-bold">{response.question}</p>
                  <p>Selected Option: {response.selectedOption}</p>
                  <p className="text-green-800">Correct Option: {response.correctOption}</p>
                </div>
              ))}
              {
                Candidatedata.responses.length === 0 && <p className="text-center">No responses given by the candidate</p>
              }
              </div>
            </div>
            )}
               
              
            </div>
            
          </div>
        </div>
      </div>
    )
}
