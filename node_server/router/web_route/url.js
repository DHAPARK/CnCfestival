const express = require("express");
const router = express.Router();
const userAgentModel = require("../../models/userAgentModel");
const moment = require("moment");

const {
  balanceInquiry,
  getTransactionLog,
  getProductInfo,
  getVideoInfo,
  getUserVideoLog,
} = require("../../utils/inquiry");

router.get("/index", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/index");

  res.render("index");
});

router.get("/regist", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/regist");

  res.render("regist"); // 페이지 이름이 regist1인 이유 ?
});

/**
 * 미리 만들어 놓은 웹 url 라우팅 시작
 * 1. 페이지 이름에 숫자 1이 붙은 이유 질문 ?
 * 2. 추가로 필요한 요청 질문 ?
 */
router.get("/answer", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/answer");

  res.render("answer");
});
router.get("/marketChild", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/marketChild");

  const datas = {
    userid: req.query.userid,
    userpw: req.query.userpw,
    senderAddress: req.query.senderAddress,
    description: req.query.description,
    receiverAddress: req.query.receiverAddress,
    productName: req.query.productName,
    amount: req.query.amount,
  };
  res.render("marketChild", { datas: datas });
});

router.get("/introduce", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/introduce");

  res.render("introduce");
});

router.get("/market", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/market");

  const marketInfo = await getProductInfo();
  console.log(`result = ${marketInfo}`);

  res.render("market", { marketInfo: marketInfo });
});

router.get("/menuList", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/menuList");

  res.render("menuList"); // 페이지 이름이 menuList1인 이유?
});

router.get("/multipleChoice", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/multipleChoice");

  res.render("multipleChoice");
});

router.get("/mypage/:userId", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/mypage/:userId");

  const userId = req.params.userId;
  const userInfo = global.sessionList[userId][userId];
  const accountAddress = userInfo["accountAddress"];

  let myInfo = {};
  myInfo["userId"] = userId;
  myInfo["balance"] = await balanceInquiry(accountAddress);
  myInfo["transferLog"] = await getTransactionLog(accountAddress);

  res.render("mypage", { info: myInfo });
});

//추가된부분
router.get("/mypage", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/mypage");

  const userId = req.params.userId;
  //const userInfo = global.sessionList[userId][userId];
  //const accountAddress = userInfo["accountAddress"];

  let myInfo = {};

  myInfo["balance"] = "None";
  myInfo["transferLog"] = "None";

  res.render("mypage", { info: myInfo });
});

router.get("/solution", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/solution");

  res.render("solution");
});

router.get("/video", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/video");

  const videoInfo = await getVideoInfo();
  console.log(`result = ${videoInfo}`);

  res.render("video", { videoInfo: videoInfo });
});

router.get("/videoChild", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/videoChild");

  let { userId, videoName, videoUrl } = req.query;
  console.log(`userId ${userId}`);
  console.log(`videoName ${videoName}`);
  console.log(`videoUrl ${videoUrl}`);

  let videoLog = await getUserVideoLog(userId, videoName);
  console.log(`videoLog ${JSON.stringify(videoLog)}`);
  console.log(`typeof ${videoLog}`);
  console.log(`typeof ${videoLog.watchComplete}`);
  console.log(`typeof ${videoLog.watchComplete == undefined}`);

  if (videoLog.watchComplete == undefined) {
    moment.locale();
    let currDate = moment().format("lll");
    videoLog = {
      watchDate: currDate,
      watchTime: 0,
      watchComplete: false,
    };
  }
  videoUrl += `?start=${videoLog.watchTime}`;

  console.log(`watchDate ${videoLog.watchDate}`);
  console.log(`watchTime ${videoLog.watchTime}`);
  console.log(`watchComplete ${videoLog.watchComplete}`);

  const datas = {
    videoUrl: videoUrl,
    videoName: videoName,
    watchDate: videoLog.watchDate,
    watchTime: videoLog.watchTime,
    watchComplete: videoLog.watchComplete,
  };

  res.render("videoChild", { datas: datas });
});

router.get("/workBookPython", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/workBookPython");

  res.render("workBookPython");
});
/**
 * 미리 만들어 놓은 웹 url 라우팅 끝
 */

module.exports = router;
