import { useEffect, useState } from "react";
import Modal from "../components/AddQuestionModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
// import QuestionDisplayModal from "./Components/QuestionDisplayModal";



export default function EditAssessment() {
    const {id} = useParams();
    const [Questions, setQuestions] = useState([]);
    const [change, setChange] = useState(false);

    async function RemoveQuestion(questionId) {
        const resp = alert("Are you sure you want to remove this question?");
        console.log(resp);
        const url = "http://localhost:4000/removequestion";
        await axios.post(url, { assessmentid:id, questionId });
        setChange(!change);
    }



    function SimpleCard({ Question, tag, questionId,difficulty }) {
        return (
          <Card className="bg-green-100 w-full mb-2">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {Question}
                <span className="ml-4 text-base italic">category:{tag}</span>
                <span className="ml-4 text-base italic">difficulty:{difficulty}</span>
                
                <Button className="float-right" >
                view
              </Button>
              <Button className="float-right ml-2" onClick={()=>{RemoveQuestion(questionId)}} >
                  Remove
                </Button>
              {/* < QuestionDisplayModal id={id} /> */}
              </Typography>
             {/* <Typography>{tag}</Typography> */}
            </CardBody>
          </Card>
        );
      }
    

   // console.log(id);
   useEffect(() => {  
    async function getQuestions() {
      const url = "http://localhost:4000/getquestions";
      const { data } = await axios.post(url, { assessmentid: id });
      console.log(data);
      setQuestions(data);
    }
    getQuestions();
  }
  , [setChange,change]);
   

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex h-screen">
          <div className="w-1/5">
            <Sidebar />
          </div>

          <div className="w-4/5">
            <h1 className="text-4xl font-bold text-center mt-4 mb-4">Edit Assessment</h1>
            <div className="flex flex-wrap h-3/4 overflow-y-scroll ">
            {Object.keys(Questions).map((question) => {
              console.log(Questions[question]);
              return (
                <div className="w-full p-0">
                  <SimpleCard
                    Question={Questions[question].question}
                    tag={Questions[question].category}
                    questionId={Questions[question]._id}
                    difficulty={Questions[question].difficulty}
                  />
                </div>
              );
            })}
            </div>
            <Modal id={id}/>
          </div>
        </div>
      </div>
    </div>
  );
}

