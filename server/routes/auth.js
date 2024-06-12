const router = require("express").Router();
const registerValidation = require("../config/validation").registerValidation;
const loginValidation = require("../config/validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("get a request about auth");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("connect auth route successfully...");
});

router.post("/register", async (req, res) => {
  // data validate
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // check whether the mailbox is registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("the mailbox is registered.");
  }

  let { username, email, password, role } = req.body;
  let newUser = new User({ username, email, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "create user successful",
      savedUser,
    });
  } catch (error) {
    return res.status(500).send("create user error");
  }
});

router.post("/login", async (req, res) => {
  // validate data
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // check whether the mailbox is registered
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("cannot find user.");
  }

  foundUser.comparePassword(req.body.password, (error, isMatch) => {
    if (error) {
      return res.status(500).send(err);
    }

    if (isMatch) {
      //create jwt
      const tokenObj = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
      return res.send({
        message: "Login successful",
        token: "Bearer " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("password is incorrect");
    }
  });
});

module.exports = router;
