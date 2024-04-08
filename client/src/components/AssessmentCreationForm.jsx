import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function AssessmentCreationForm() {
  const navigate = useNavigate();
    
    async function createAssessment(e) {
        e.preventDefault()
        const assessmentName = e.target[0].value;
        const assessmentDescription = e.target[1].value;
        const assessmentDuration = e.target[2].value;
        const assessmentType = e.target[3].value;
        const url = '""createassessment';
        const {data} = await axios.post(url,{assessmentName,assessmentDescription,assessmentDuration,assessmentType},{withCredentials:true});
        //console.log(data)
        navigate('/draftassessments');
    }

    return (
        <div>
             <h1 className="text-2xl font-bold">Create Assessment</h1>
          <br />
          <form onSubmit={createAssessment}>
          
      <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
        Assessment Name
      </label>
      <input
        type='text'
        placeholder='Assessment Name'
        required
        className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
      />
      <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
        Assessment Description
      </label>
      <input
        type='text'
        placeholder='Assessment Description'
        required
        className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
      />
      <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
        Assessment Duration
      </label>
      <input
        type='number'
        placeholder='Assessment Duration in mins'
        required
        className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
      />
      <label className='mb-[4px] block text-base font-medium text-dark dark:text-white'>
        Assessment Type 
      </label>
      <input
        type='text'
        placeholder='Assessment Type'
        required
        className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
      />
      
      <button className='px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500'>
        Create Assessment
      </button>

          </form>
        </div>
    )
}