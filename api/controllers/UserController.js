const User = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bycryptsalt = bycrypt.genSaltSync(10);
const jwtsecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email, password, firstname, lastname, Organization } = req.body;
  const hashedpassword = bycrypt.hashSync(password, bycryptsalt);
  const createduser = await User.create({
    email,
    password: hashedpassword,
    firstname,
    lastname,
    Organization,
  });

  jwt.sign({ userId: createduser._id, email }, jwtsecret, {}, (err, token) => {
    if (err) throw err;
    res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(201)
      .json({
        id: createduser._id,
      });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const founduser = await User.findOne({ email });
  console.log("inside controller");
  if (founduser) {
    const passswordOK = bycrypt.compareSync(password, founduser.password);
    if (passswordOK) {
      console.log("password ok");
      jwt.sign(
        { userId: founduser._id, email },
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { sameSite: "none", secure: true }).status(200).json({
              id: founduser._id,
});
        }
      );
    } else {
      res.status(401).json("wrong password");
    }
  } else {
    res.status(404).json("user not found");
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json("logged out");
};

module.exports = { login, logout, register };
