import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button, Spinner } from "@material-tailwind/react";
import axios from "axios";

export default function AIGenerator() {
    const [Questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [assessmentid, setAssessmentid] = useState(null);
    async function getAssessments() {
      const url = "getassessmentsdata";
      const { data } = await axios.post(url, { assessmentStatus: "draft" },{});
      //console.log(data);
      setAssessments(data);
    }

    function SimpleCard({ Question, tag, id,difficulty }) {
      if (selectedQuestions.includes(id)) {
        return (
          <Card className="bg-green-100 w-full">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {Question}
                <Button className="float-right"
                onClick={() => {
                  setSelectedQuestions((add) =>
                    add.filter((item) => item !== id)
                  );
                }}
              >
                unselect
              </Button>
              </Typography>
              <Typography>tag:{tag}</Typography>
              <Typography>difficulty:{difficulty}</Typography>
            </CardBody>
          </Card>
        );
      } else {
        return (
          <Card className="bg-blue-100 w-full container mb-2">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {Question}
                <Button className="float-right"
                onClick={() => {
                  setSelectedQuestions((add) => [...add, id]);
                }}
              >
                select
              </Button>
              </Typography>
              <Typography>tag:{tag}</Typography>
              <Typography>difficulty :{difficulty}</Typography>
            </CardBody>
          </Card>
        );
      }
      }

      async function AddquestionToAssessment() {
        // console.log(selectedQuestions);
        console.log(assessmentid);
        if(assessmentid === null){
          alert("Please select an assessment to add questions");
          return;
        }
        const url = "addquestiontoassessment";
         const { data } = await axios.post(url, {
           questionid:selectedQuestions,assessmentid:assessmentid});
          //   console.log(data);
          if(data){
            alert("Questions added successfully");
          }
          setSelectedQuestions([]);
      setAssessmentid(null);
      setQuestions([]);

       }

    async function handleSubmit(e) {
        e.preventDefault();
        //console.log(e.target[0].value);
        setIsLoading(true);
        setQuestions([]);
        const text = e.target[0].value;
        const numques = e.target[1].value;
        console.log(text);
        const url = "AIgenerate";
        const { data } = await axios.post(url,{text,numques});
        console.log(data);
        if(data.error){
          alert(data.error);
          setIsLoading(false);
          setQuestions([]);
          return;

        }
        console.log(data);
        setQuestions(data);
        setIsLoading(false);
        getAssessments();
    }



    return (
        <div className="">
      <Navbar />
      <div className="flex ">
        
        <div className="bg-white w-1/4 ">
         <Sidebar />
        </div>
        <div className=" w-3/4 p-2 " id="section">
          <div className="flex flex-grow w-full">
          <div>
            <h1 className="text-2xl font-bold">AI Question search</h1>
            <br />
            <form  onSubmit={handleSubmit}>
                <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
                 Enter keywords to search for AI recommended questions from database
                </label>
                <input
                    type='text'
                    placeholder='Enter the text '
                    required
                    className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                />
                <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
                 Number of questions
                </label>
                <input
                    type='number'
                    placeholder='Enter the number of questions'
                    required
                    className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                />
                <button className="bg-primary text-white p-2 rounded-md">Recommend Questions</button>
            </form>
        </div>
        {   
              isLoading && <Spinner className="h-12 w-12" />
            }
          </div>
          <div className="flex max-h-96 m-2" >
            
            <div className="flex flex-wrap overflow-y-scroll ">
            {Object.keys(Questions).map((question) => {
              console.log(Questions[question]);
              return (
                <div className="w-full p-0">
                  <SimpleCard
                    Question={Questions[question].question}
                    tag={Questions[question].category}
                    id={Questions[question]._id}
                    difficulty={Questions[question].difficulty}
                  />
                </div>
              );
            })}
            </div>
          </div>
          { selectedQuestions.length > 0 && <div>
          <select name="" id="" value={assessmentid} onChange={(e)=>{setAssessmentid(e.target.value)}}  >
            <option >
              Select Assessment
            </option>
            {Object.keys(assessments).map((assessment) => {
              return (
                <option value={assessments[assessment]._id}>
                  {assessments[assessment].assessmentName}
                </option>
              );
            })}
          </select>
          <Button className="bg-primary text-white p-2 rounded-md m-2" onClick={AddquestionToAssessment}>Add Questions to Assessment</Button>

          </div>}
          
        </div>

      </div>
    </div>
        
    );
}
