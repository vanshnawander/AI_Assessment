const express = require("express");
const router = express.Router();

const {sendInviteMail} = require('../controllers/invitemail')
const {GetInvitedCandidates} = require('../controllers/CandidatesController')

router.post("/invitecandidates", sendInviteMail);
router.post("/getcandidatesinvited", GetInvitedCandidates);

module.exports = router;