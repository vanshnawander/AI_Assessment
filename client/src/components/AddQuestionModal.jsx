import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Modal(id) {
  const [modalOpen, setModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
 // console.log(id);

  function SimpleCard({ Question, tag, id }) {
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
            <Typography>{tag}</Typography>
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
            <Typography>{tag}</Typography>
          </CardBody>
        </Card>
      );
    }
  }

  async function GetData() {
    const { data } = await axios.get("http://localhost:4000/questions");
    setQuestions(data);
  }
  useEffect(() => {
    GetData();
  }, []);

  


  async function AddquestionToAssessment() {
   // console.log(selectedQuestions);
    setModalOpen(false)
   const url = "http://localhost:4000/addquestiontoassessment";
    const { data } = await axios.post(url, {
      questionid:selectedQuestions,assessmentid:id.id});
     //   console.log(data);
     window.location.reload();
      if(data){
        alert("Questions added successfully");
      }
  }

  return (
    <>
      <div className="container mx-auto place-content-center items-center">
        <button
          onClick={() => setModalOpen(true)}
          className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
        >
          Add Question
        </button>
        <div
          className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            onFocus={() => setModalOpen(true)}
            className="w-full h-full rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
          <div className="flex h-full">
            
  
            <div className=" flex flex-wrap w-5/6 h-full overflow-y-scroll">
              {Object.keys(questions).map((index) => {
                //console.log(questions[index]);
                return (
                  <div className="flex w-full">
                    <SimpleCard
                      Question={questions[index].question}
                      tag={questions[index].category}
                      id={questions[index]._id}
                    />
                  </div>
                );
              })}
            </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark" onClick={AddquestionToAssessment}>
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
