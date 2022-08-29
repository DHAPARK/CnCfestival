const express = require("express");
const app = express();
const router = express.Router();
const userAgentModel = require("../../models/userAgentModel");
const moment = require("moment");
const cors = require("cors");
app.use(cors());

const {
  balanceInquiry,
  getTransactionLog,
  getProductInfo,
  getVideoInfo,
  getUserVideoLog,
  getQuizInfo,
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
    image: req.query.image,
  };
  res.render("marketChild", { datas: datas });
});

router.get("/introduce", (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/introduce");

  res.render("introduce");
});

router.get("/market/:page", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/market/:page");

  var totIndex = 6;
  var lastIndex = totIndex * page;

  const marketInfo = await getProductInfo();

  var page = req.params.page;

  if (page <= 0) {
    page = 1;
  }

  console.log(`page : ${page}`);
  console.log(`result = ${marketInfo}`);

  var totalPage =
    parseInt(marketInfo.length / 6) < 1 ? 1 : parseInt(marketInfo.length / 6);
  if (marketInfo.length % 6 != 0) {
    totalPage += 1;
  }
  var _marketInfo = marketInfo.slice(
    totIndex * (page - 1),
    totIndex * (page - 1) + totIndex * page
  );

  res.render("market", {
    marketInfo: _marketInfo,
    totalPage: totalPage,
    page: page,
  });
});

router.get("/market", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/market");

  res.redirect("http://220.67.231.91:80/web/market/1");
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

router.get("/solution/:quizNum/:userId", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/solution");
  let quizNum = req.params.quizNum;
  let userId = req.params.userId;
  // let quizNum = req.query['quizNum'];
  // let userId = req.query['userId'];

  let quizInfo = await getQuizInfo();
  console.log(`userId ${userId}`);
  console.log(`quizNum ${quizNum}`);
  console.log(`${typeof quizNum}`);
  let temp;
  for (let quiz of quizInfo) {
    if (parseInt(quiz.quizNum) == quizNum) {
      temp = quiz;
      break;
    }
  }
  console.log(`temp = ${temp}`);
  res.render("solution", { quizInfo: temp });
});

router.get("/video", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/video");

  res.redirect("http://220.67.231.91:80/web/video/1");
});

router.get("/video/:page", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/video/:page");

  const videoInfo = await getVideoInfo();
  var totIndex = 6;
  var lastIndex = totIndex * page;

  var page = req.params.page;

  if (page <= 0) {
    page = 1;
  }

  var totalPage =
    parseInt(videoInfo.length / 6) < 1 ? 1 : parseInt(videoInfo.length / 6);
  if (videoInfo.length % 6 != 0) {
    totalPage += 1;
  }
  var _videoInfo = videoInfo.slice(
    totIndex * (page - 1),
    totIndex * (page - 1) + totIndex * page
  );

  res.render("video", {
    videoInfo: _videoInfo,
    totalPage: totalPage,
    page: page,
  });
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
  res.setHeader("Access-Control-Allow-Origin", "https://www.youtube.com");
  res.render("videoChild", { datas: datas });
});

router.get("/workBookPython", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/workBookPython");
  let quizInfo = await getQuizInfo();
  const datas = {
    quizInfo: quizInfo,
  };
  console.log(quizInfo);
  res.render("workBookPython", { quizInfo: quizInfo });
});
/**
 * 미리 만들어 놓은 웹 url 라우팅 끝
 */

module.exports = router;
