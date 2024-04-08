const express = require("express");
const router = express.Router();

const {sendInviteMail} = require('../controllers/invitemail')
const {GetInvitedCandidates,getCandidatesReport} = require('../controllers/CandidatesController')

router.post("/invitecandidates", sendInviteMail);
router.post("/getcandidatesinvited", GetInvitedCandidates);
router.post("/getcandidatereport", getCandidatesReport);

module.exports = router;