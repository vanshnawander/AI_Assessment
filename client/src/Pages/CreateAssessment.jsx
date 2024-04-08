import AssessmentCreationForm from "../components/AssessmentCreationForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";


export default function CreateAssessment() {
    return (
      <div className="">
        <Navbar />
        <div className="flex ">
          
          <div className="bg-white w-1/4 ">
           <Sidebar />
          </div>
          <div className=" w-3/4 p-2" id="section">
            
            <div className="flex flex-grow w-full">
            <AssessmentCreationForm /> 
            </div>
            
          </div>
        </div>
      </div>
    );
  }