import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useState } from "react";
import DialogDefault from "../components/InviteCandidatesModal";
import axios from "axios";

 
export default function LiveAssessmentAnalytics() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState({});
  const [candidatesInvited, setCandidatesInvited] = useState([]);

    async function getAssessment() {
    const url = "http://localhost:4000/getassessment/"+id;
    const { data } = await axios.get(url);
    setAssessment(data);
    }


async function getCandidatesInvited() {
    const url = "http://localhost:4000/getcandidatesinvited";
    const { data } = await axios.post(url, { assessmentId: id });
    console.log(data);
    setCandidatesInvited(data);
    }


  useEffect(() => {
    getCandidatesInvited();
    getAssessment();
  }, []);

  function SimpleCard({
    assessmentname,
    asessmentDesc,
    TimeDuration,
    assessmentType, 
  }) {
    return (
      <Card className="bg-green-100 w-full mb-2">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-1">
            AssessmentName: {assessmentname}
          </Typography>
          <Typography>description: {asessmentDesc}</Typography>
          <Typography>Time Duration {TimeDuration}</Typography>
          <div className="float-right">
          <DialogDefault id={id} />
          </div>
          
          <Typography>Assessment Type {assessmentType}</Typography>
        </CardBody>
      </Card>
    );
  }





  function CardForCandidatesInvited() {
    return (
      <Card className="flex flex-grow bg-gray-100 w-1/3 mb-2 overflow-y-scroll">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-1">
            Candidates Invited
          </Typography>

          {Object.keys(candidatesInvited).map((candidate) => {
            console.log(candidatesInvited[candidate]);
            return (
                <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {candidatesInvited[candidate].email}
                </Typography>
                </div>
            );
          }
          )}
        </CardBody>
      </Card>
    );
  }
   const candidatesAttempted = candidatesInvited.filter(candidate => candidate.isAttempted === true);
   function CardForAttemptedCandidatesWithScore() {
    return (
      <Card className="flex flex-grow bg-gray-100 w-1/3 mb-2 overflow-y-scroll">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-1">
            Candidates Attempted
          </Typography>
          { Object.keys(candidatesAttempted).map((candidate) => {
            console.log(candidatesAttempted[candidate]);
            return (
                <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {candidatesAttempted[candidate].email}
                </Typography>
                </div>
            );

          })}
        </CardBody>
      </Card>
    );
  }


  return (
    <div className="">
      <Navbar />
      <div className="flex ">
        <div className="bg-white w-1/4 ">
          <Sidebar />
        </div>
        <div className=" w-full p-2">
          <SimpleCard assessmentname={assessment.assessmentName} asessmentDesc={assessment.assessmentDescription} TimeDuration={assessment.duration} assessmentType={assessment.assessmentType}  />
          <div className="flex h-5/6">
            <div className="flex  w-1/2 m-2">
              <CardForCandidatesInvited />
            </div>
            <div className="flex w-1/2 m-2">
              <CardForAttemptedCandidatesWithScore />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
