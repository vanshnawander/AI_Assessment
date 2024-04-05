import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TestPortal from "./Pages/TestPortal";
import CreateAssessment from "./Pages/CreateAssessment";
import CreateQuestion from "./Pages/CreateQuestion";
import DraftAssessments from "./Pages/DraftAssessments";
import LiveAssessments from "./Pages/LiveAssessments";
import Profile from "./Pages/Profile";
import JobDescAIGenerator from "./Pages/JobDescriptionGenerator";
import EditAssessment from "./Pages/EditAssessment";
import AIGenerator from "./Pages/AIgenerate";
import LiveAssessmentAnalytics from "./Pages/LiveAssessmentAnalytics";

export default function PageRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test/:id/UserDetails" element={<TestPortal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createassessment" element={<CreateAssessment />} />
        <Route path="/createquestion" element={<CreateQuestion />} />
        <Route path="/draftassessments" element={<DraftAssessments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liveassessments" element={<LiveAssessments />} />
        <Route path='/jobdescAi' element={<JobDescAIGenerator />} />
        <Route path="/editassessment/:id" element={<EditAssessment />}  /> 
        <Route path='/AIgenerator' element={<AIGenerator />} />
        <Route path='/liveAssessmentAnalytics/:id' element={<LiveAssessmentAnalytics />} />
      </Routes>
    </div>
  );
}
