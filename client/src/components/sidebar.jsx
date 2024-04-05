import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 
export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const navigate = useNavigate();
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  function handlelogout(){
    axios.get('http://localhost:4000/logout', { withCredentials: true });
    console.log('logged out');
    window.location.href = '/';

 }
 
  return (
    <Card className="h-[calc(95vh)] w-full max-w-[20rem] bg-blue-200 shadow-xl shadow-blue-gray-900/5">
      <List>
        <ListItem onClick={()=>{navigate('/dashboard')}}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Assessments
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem  onClick={()=>{navigate('/createassessment')}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Create Assessment
              </ListItem>
              <ListItem onClick={()=>{navigate('/draftassessments')}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Draft Assessments
              </ListItem>
              <ListItem onClick={()=>{navigate('/liveassessments')}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Live Assessments
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Assessment History
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem onClick={() =>{navigate('/AIgenerator')}} >
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Advanced AI Search
        </ListItem>
        <ListItem  onClick={()=>{navigate('/jobdescAi')}}>
          <ListItemPrefix>
            <CubeTransparentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Job description based search
        </ListItem>

        <ListItem onClick={()=> {navigate('/createquestion')}}>
          <ListItemPrefix>
            <QuestionMarkCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          create Questions
         {/* create Questions Library */}
        </ListItem>

        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handlelogout} >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
     
    </Card>
  );
}