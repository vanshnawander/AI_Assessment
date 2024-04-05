const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const { login, register, logout } = require("../controllers/UserController");

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

module.exports = router;
