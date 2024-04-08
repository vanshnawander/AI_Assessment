import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

export default function LiveAssessments() {
    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();

    async function getAssessments() {
         const url = 'getassessmentsdata';
         const {data} = await axios.post(url, {assessmentStatus: "live"});
         //console.log(data);
         setAssessments(data);
//         // data.map((assessment) => {
//         //     return SimpleCard(assessment.name, assessment.description);
//         // })
//         // console.log(data)
     }
     async function activateAssessment(id){
        console.log(id);
        const url = "draftassessment";
        const { data } = await axios.post(url, { assessmentId: id },{});
        if(data){
          alert("Assessment made draft successfully");
          navigate('/draftassessments');
        }
      }


     function SimpleCard({ name, description,id }) {
        return (
          <Card className="mt-6 w-5/6 ml-9">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {name}
              </Typography>
              <Typography>
                {description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button className="ml-5" onClick={()=>{navigate(`/liveAssessmentAnalytics/${id}`)}}>Analytics and Details</Button>
              <Button className="float-right" onClick={()=>{activateAssessment(id)}}>Close Assessment</Button>
            </CardFooter>
          </Card>
        );
      }

    useEffect(() => {
        getAssessments();
    }, []);

  return (
     <div>
      <Navbar />
    <div className="flex h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
     
      <div className="w-3/4">
        {Object.keys(assessments).map((assessment) => {
            console.log(assessments[assessment]);
          return (
            <div>
              <SimpleCard name={assessments[assessment].assessmentName} description={assessments[assessment].assessmentDescription} id={assessments[assessment]._id
            }/>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}




