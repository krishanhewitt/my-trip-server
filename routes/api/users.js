const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../models/User");
const { verifyJWT } = require("../../middleware/auth");

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

    newUser.save(function (err, newRecord) {
      if (err) throw err;

      const payload = {
        id: newRecord._id,
        nickname: newRecord.nickname,
      };

      //sign the JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) return res.status(500).json({ message: err });
          return res.status(200).json({ message: "Sucesss", token: token });
        }
      );
    });
  }
});

//@route POST api/users
//@description Log in user
router.post("/login", (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ email: userLoggingIn.email })
    .then((dbUser) => {
      //if no record in the db matches the email, return err
      if (!dbUser) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      //compare the entered pwd with the one in the db
      bcrypt
        .compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          //if password is incorrect
          if (!isCorrect) {
            return res.status(401).json({
              message: "Invalid email or password",
            });
          }

          //create the data payload for JWT
          const payload = {
            id: dbUser._id,
            nickname: dbUser.nickname,
          };

          //sign the JWT
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.status(500).json({ message: err });
              return res.status(200).json({ message: "Sucesss", token: token });
            }
          );
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//check if user is currently logged in
router.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json({
    isLoggedIn: true,
    userInfo: { id: req.user.id, nickname: req.user.nickname },
  });
});

module.exports = router;
