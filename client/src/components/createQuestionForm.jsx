import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";

export default function CreateQuestionForm() {
    const [options, setOptions] = useState([{ text: "", isCorrect: false }]); // Initialize options state with an empty option
    //const [id,setId] =useContext(UserContext);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    console.log(file);


    // Function to handle adding a new option
    function addOption() {
        setOptions([...options, { text: "", isCorrect: false }]); // Add an empty option to the options state
    }

    async function createQuestion(e) {
        e.preventDefault();
        const questionText = e.target[0].value;
        const difficulty = e.target[1].value;
        const category = e.target[2].value;
        const optionsData = options.map((option) => ({
            option: option.text,
            isCorrect: option.isCorrect,
        }));

        const url = "createquestion";
        const { data } = await axios.post(url, {
            question:questionText,
            difficulty,
            category,
            options: optionsData,
        }, { withCredentials: true });

    if (data) {
        alert("Question created successfully");
        setOptions([{ text: "", isCorrect: false }]);
        e.target.reset(); // Reset the form fields
    } else {
        alert("Failed to create question");
    }
    }
    // Rest of the code...

    return (
        <div className="flex w-full">
            <form onSubmit={createQuestion} className="w-full">
                <label className='mb-[4px] flex flex-wrap text-base font-medium text-dark dark:text-white'>
                    Question
                </label>
                <input
                    type='text'
                    placeholder='Question'
                    required
                    className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                />

                <label className='mb-[4px] flex flex-wrap text-base font-medium text-dark dark:text-white'>
                    Difficulty
                </label>
                <input
                    type='text'
                    placeholder='Difficulty'
                    required
                    className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                />

                <label className='mb-[4px] flex flex-wrap text-base font-medium text-dark dark:text-white'>
                    Category
                </label>
                <input
                    type='text'
                    placeholder='Category'
                    required
                    className='mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                />


                {/* <label className='mb-[4px] flex flex-wrap text-base font-medium text-dark dark:text-white'>
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        // Handle the file upload logic here
                    }}
                /> */}
                {/* Render the options */}
                {options.map((option, index) => (
                    <div key={index}>
                        <label className="mb-[4px] flex flex-wrap text-base font-medium text-dark dark:text-white">
                            Option {index + 1}
                        </label>
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            required
                            className="mb-3 w-5/6 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px]  text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                            value={option.text}
                            onChange={(e) => {
                                const updatedOptions = [...options];
                                updatedOptions[index].text = e.target.value;
                                setOptions(updatedOptions);
                            }}
                        />
                        <Checkbox
                            checked={option.isCorrect}
                            onChange={(e) => {
                                const updatedOptions = [...options];
                                updatedOptions[index].isCorrect = e.target.checked;
                                setOptions(updatedOptions);
                            }}
                        />
                    </div>
                ))}

                <div className="flex ">
                    <button
                        type="button"
                        onClick={addOption}
                        className="px-8 py-2 mr-8 rounded-md bg-teal-500 text-white float-right font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                    >
                        Add Option
                    </button>
                    <button 
                        type="submit"
                        className="px-8 py-2 rounded-md ml-6 bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                    >
                        Create Question
                    </button>
                </div>              


                {/* Rest of the code... */}
            </form>
        </div>
    );
}
