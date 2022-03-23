const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../../models/User");

//@route POST api/users
//@description Add new user account
router.post("/register", async (req, res) => {
  const user = req.body;
  const takenEmail = await User.findOne({ email: user.email });

  if (takenEmail) {
    res.status(400).json({ message: "Email is already in use" });
  } else {
    const newUser = new User({
      email: user.email.toLowerCase(),
      password: user.password,
      nickname: user.nickname,
    });

    newUser.save(function(err) {
      if (err) throw err;
    });
    res.status(200).json({ message: "New user added successfully" });
  }
});


//@route POST api/users
//@description Log in user
router.post("/login", (req, res) => {
    const userLoggingIn = req.body;
    User.findOne({ email: userLoggingIn.email }).then((dbUser) => {
      
      //if no record in the db matches the email, return err
      if (!dbUser) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //compare the entered pwd with the one in the db
      bcrypt
        .compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          if (isCorrect) {
            console.log("correct password entered");
  
          //return unauthorized credentials if no match
          } else {
            return res.status(401).json({
              message: "Invalid email or password",
            });
          }
        });
    });
  });

  module.exports = router;