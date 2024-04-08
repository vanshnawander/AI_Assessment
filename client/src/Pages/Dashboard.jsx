import Graph from "../components/GraphForDashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

export default function Dashboard(){
  
    return(
        <div >
        <Navbar />
        <div className="flex ">
          
          <div className="bg-white w-1/4 ">
           <Sidebar />
          </div>
          <div className=" w-3/4 p-2" >
          <Graph />
            
          </div>
        </div>
      </div>
    )

}