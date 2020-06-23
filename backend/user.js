const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const jwt = require("jsonwebtoken");

const config = require("config");
const auth = require("./auth");

users = [
  {
    user_name: "hitesh",
    password: "1234567",
  },
  {
    user_name: "vicara",
    password: "1234567",
  },
];

router.post(
  "/",

  async (req, res) => {
    const { name, password } = req.body;
    console.log(req.body);
    try {
      let us = {};
      users.map((user) => {
        if (user.user_name == name && user.password == password) {
          us = user;
          return;
        }
      });
      if (Object.keys(us).length == 0) {
        res.status(401).send("invalid details");
      }
      console.log(us);
      const payload = {
        user: {
          id: name,
        },
      };
      await jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
          
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, (req, res) => {
  res.status(400).send(req.user.id);
  console.log(req.user.id);
});
module.exports = router;
