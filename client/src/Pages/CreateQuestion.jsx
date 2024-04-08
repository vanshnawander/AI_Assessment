import CreateQuestionForm from "../components/createQuestionForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";


export default function CreateQuestion() {
    return (
        <div className="">
          <Navbar />
          <div className="flex ">
            
            <div className="bg-white w-1/5 ">
             <Sidebar />
            </div>
            <div className=" w-4/5 p-2" id="section">
              
              <div className="flex flex-grow w-full">
                <CreateQuestionForm />
              {/* <AssessmentCreationForm />  */}
              </div>
              
            </div>
          </div>
        </div>
      );
    }