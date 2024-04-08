import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTimer } from "react-timer-hook";
import { useLocation, useParams } from "react-router-dom";

export default function TestPortal() {
  const [active, setActive] = useState(1);
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const [TestStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  // console.log(candidate, email);
  const { id } = useParams();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (questionId, optionId) => {
    const updatedOptions = [...selectedOptions];
    const existingOptionIndex = updatedOptions.findIndex(
      (option) => option.questionId === questionId
    );
    console.log(existingOptionIndex);
    if (existingOptionIndex !== -1) {
      updatedOptions[existingOptionIndex] = { questionId, optionId };
    } else {
      updatedOptions.push({ questionId, optionId });
    }

    setSelectedOptions(updatedOptions);
    console.log(selectedOptions);
  };

  const submitTest = async () => {
    const url = "http://localhost:4000/submitTest";
    //console.log(candidate, email, selectedOptions);
    const { data } = await axios.post(url, {
      assessmentId: id,
      email,
      selectedOptions,
    });
    console.log(data);
    if (data) {
      setTestEnded(true);
    }
  };

  useEffect(() => {
    async function getQuestions() {
      console.log("inside getQuestions");
      const url = "http://localhost:4000/getquestionsfortest";
      const { data } = await axios.post(url, {
        assessmentid: id,
        email: email,
      });
      console.log(data);
      if (data === "already attempted") {
        alert("You have already attempted this test");
        
      } else {
        setQuestions(data);
      }
    }
    getQuestions();
  }, []);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });
  const next = () => {
    if (active === questions.length) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };


  if (TestStarted === false) {
    console.log("inside test started");
    return (
      <div className="flex flex-col h-screen justify-center items-center  bg-blue-100">
        <h1 className="text-2xl m-2 ">Welcome to the test</h1>
        <br />
        <p className="flex">
          Read the instructions carefully before starting the test
        </p>
        <br />
        <p>please click on start test to start the test</p>
        <br />
        <Button
          onClick={() => {
            setTestStarted(true);
          }}
          className="w-max"
        >
          Start Test{" "}
        </Button>
      </div>
    );
  } else if (testEnded === true && TestStarted === true) {
    return (
      <div className="flex flex-col h-screen justify-center items-center  bg-blue-100">
        <h1 className="text-2xl m-2 ">Test Ended</h1>
        <br />
        <p className="flex">Thank you for taking the test</p>
        <br />
        <p>You can now close the window</p>
        <br />
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="p-4 bg-brown-100 text-lg text-center">Sample test</div>

        <div className="flex h-screen">
          <div className="bg-gray-200 w-1/4 pl-4 pt-4">
            <div className="place-content-center">
              <Button
                variant="text"
                className="bg-green-300 m-5 w-1/2 "
                onClick={submitTest}
              >
                Submit
              </Button>
            </div>
            <TimerComponent minutes={20} />
            <h1>Questions</h1>
            <div className="">
              {questions.map((question, index) => (
                <IconButton
                  className="bg-white text-color p-7 m-3 text-lg"
                  {...getItemProps(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-2 bg-green-300"
              onClick={next}
              disabled={active === questions.length}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col bg-blue-300 w-3/4 p-2">
            <div>
              {questions.length > 0 && (
                <div className="">
                  <h2>{"Question " + active}</h2>
                  <p>{questions[active - 1].question}</p>
                  {Object.keys(questions[active - 1].options).map(
                    (key, index) => (
                      <div key={questions[active - 1].options[key]._id}>
                        <input
                          type="radio"
                          checked={
                            selectedOptions.find(
                              (option) =>
                                option.questionId === questions[active - 1]._id
                            )?.optionId ===
                            questions[active - 1].options[key]._id
                          }
                          name={questions[active - 1]._id}
                          value={questions[active - 1].options[key]._id}
                          onChange={() =>
                            handleOptionChange(
                              questions[active - 1]._id,
                              questions[active - 1].options[key]._id
                            )
                          }
                        />
                        <label>
                          {questions[active - 1].options[key].option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      submitTest();
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Time Remaining</h1>
      <div style={{ fontSize: "60px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

function TimerComponent(minutes) {
  const time = new Date();
  //console.log(minutes.minutes);
  time.setSeconds(time.getSeconds() + 60 * minutes.minutes);
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
