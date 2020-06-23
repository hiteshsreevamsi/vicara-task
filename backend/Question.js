const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const jwt = require("jsonwebtoken");

const config = require("config");
const auth = require("./auth");
let Questions = {
  title: "",
  text: "",
  code: "",
  answers: [],
  count: 0,
  tags: [],
  createdBy: "",
};
router.post("/", auth, (req, res) => {
  if (req.body.title) Questions.title = req.body.title;
  if (req.body.text) Questions.text = req.body.text;
  if (req.body.code) Questions.code = req.body.code;
  if (req.body.answers) Questions.answers = req.body.answers;
  if (req.body.tags)
    req.body.tags.forEach((tag) => {
      Questions.tags.push(tag);
    });
  if (req.body.createdBy) Questions.createdBy = req.body.createdBy;

  res.status(200).json(Questions);
});
router.get("/", (req, res) => res.json(Questions));

router.post("/answer", auth, (req, res) => {
  Questions.answers.push(req.body);
  res.status(200).json(Questions);
});

module.exports = router;
