import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
  
export default function DialogDefault({id}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
 
  const handleOpen = () => setOpen(!open);
function handleClick(e) {
    e.preventDefault();
    const data =axios.post("http://localhost:4000/invitecandidates", {email: email, assessmentId: id});
    console.log(data);
    if(data.status === 400){
        alert("Email already invited");
    }
        console.log(email);
        handleOpen();
    };
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Invite Candidates 
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Enter Email to invite Candidates to assessment</DialogHeader>
        <DialogBody>
            <form  onSubmit={handleClick} >
         <input type="email" name="email" id="" value={email} onChange={(ev) => setEmail(ev.target.value)} required />
         <Button variant="gradient" color="green" type="submit" className="float-right" >
            <span>Invite Candidates</span>
          </Button>
         </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          
        </DialogFooter>
      </Dialog>
    </>
  );
}