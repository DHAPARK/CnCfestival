const express = require("express");
const router = express.Router();
const userAgentModel = require("../models/userAgentModel");

router.get("/", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/");

  res.render("index");
});

router.get("/regist", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/regist");

  res.render("regist");
});

router.get("/solution", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/regist");

  res.render("solution");
});

module.exports = router;
