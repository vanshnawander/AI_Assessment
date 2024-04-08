import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card, CardBody, CardFooter,Typography, Button,} from "@material-tailwind/react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

export default function DraftAssessments() {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();
  function SimpleCard({ name, description,id }) {
  //  console.log(id);
    return (
      <Card className="mt-6 w-5/6 ml-9">
        <CardBody className="mb-0">
          <Typography variant="h5" color="blue-gray" className="m-0">
            {name}
          </Typography>
          <Typography className="m-0">{description}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={()=>{navigate(`/editassessment/${id}`)}}>Edit Assessment</Button>
          <Button onClick={()=>{activateAssessment(id)}} className="float-right">Activate Assessment</Button>
        </CardFooter>
      </Card>
    );
  }
  async function activateAssessment(id){
    console.log(id);
    const url = "liveassessment";
    const { data } = await axios.post(url, { assessmentId: id },{});
    if(data){
      alert("Assessment is live");
      navigate('/liveassessments');
    }
  }


  async function getAssessments() {
    const url = "getassessmentsdata";
    const { data } = await axios.post(url, { assessmentStatus: "draft" },{});
    //console.log(data);
    setAssessments(data);
  }

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <div>
        <Navbar />
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>

      <div className="w-3/4 overflow-y-scroll">
        {Object.keys(assessments).map((assessment) => {
          console.log(assessments[assessment]);
          return (
            <div>
              <SimpleCard
                name={assessments[assessment].assessmentName}
                description={assessments[assessment].assessmentDescription}
                id={assessments[assessment]._id}
              />
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}


