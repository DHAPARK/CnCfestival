const express = require("express");
const moment = require('moment');
const router = express.Router();
const userAgentModel = require("../../models/userAgentModel");

const { addFavicon, getFaviconList, putItemToDB } = require("../../utils/DB");
const {
  balanceInquiry,
  getFranchise,
  getTransactionLog,
  getAllUserBalance,
  getRecentTransferAccount,
  getVideoInfo,
  getQuizInfo,
  calcPoint
} = require("../../utils/inquiry");
const { transferHSC } = require('../../utils/transaction');
const { checkIdDuplicate } = require("../../utils/validation");
const { DB_COLLECTION, POINT } = require("../../utils/constant");

/**
 * 아이디 중복 검사
 * @method get
 * @param {string} userid
 */
router.get("/checkIdDuplicate/:userid", (req, res) => {
  userAgentModel.printUserAgent(
    req.header("user-agent"),
    "/checkIdDuplicate/:userid"
  );
  const userid = req.params.userid;

  console.log(`### /checkIdDuplicate/${userid} : data`);
  console.log(`userid = ${userid}`);

  const idCheck = async () => {
    var checkUserid = await checkIdDuplicate(userid);
    console.log(`checkUserId res = ${checkUserid}`);

    if (checkUserid === "200") {
      //중복이 없을때 (회원가입 해도될때) 200을 보냄
      res.json("200");
    } else {
      //중복이 있을때 (회원가입 하면 안될때) 100을 보냄
      res.json("100");
    }
  };
  idCheck();
});

/**
 * 잔액 조회
 * @method get
 * @param {string} userAccount
 */
router.get("/getBalance/:userAccount", (req, res) => {
  userAgentModel.printUserAgent(
    req.header("user-agent"),
    "/getMyBalance/:userAccount"
  );
  console.log(`req.session.userId ${global.sessionList[0].userId}`);
  console.log(`req.session.isLogin ${global.sessionList[0].isLogin}`);

  const userAccount = req.params.userAccount;

  console.log(`### /getMyBalance/${userAccount} : data`);
  console.log(`userAccount = ${userAccount}`);

  var value;
  const getBalance = async () => {
    value = await balanceInquiry(userAccount);
    const userBalance = {
      userBalance: value,
    };
    res.json(userBalance);
  };
  getBalance();
});

/**
 * GPS 정보 가져오기 매핑 getGpsInfo
 * @method get
 * @returns {object}
 */
router.get("/getGpsInfo", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/getGpsInfo");

  console.log(`### /getGpsInfo : data`);

  const result = await getFranchise();
  console.log(`result = ${result}`);
  res.json(result);
});

/**
 * Video 정보 가져오기 매핑 getGpsInfo
 * @method get
 * @returns {object}
 */
 router.get("/getQuizInfo", async (req, res) => {
    userAgentModel.printUserAgent(req.header("user-agent"), "/getQuizInfo");
  
    console.log(`### /getQuizInfo : data`);
  
    const result = await getQuizInfo();
    console.log(`result = ${result}`);
    res.json(result);
  });

/**
 * Video 정보 가져오기 매핑 getGpsInfo
 * @method get
 * @returns {object}
 */
router.get("/getVideoInfo", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/getVideoInfo");

  console.log(`### /getVideoInfo : data`);

  const result = await getVideoInfo();
  console.log(`result = ${result}`);
  res.json(result);
});

/**
 * 비디오 시청 시간에 따라 포인트 지급
 * @method get
 * @returns {object}
 */
 router.post("/savePoint", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/savePoint");
  const { userId, userAccount, videoUrl, watchLength } = req.body;
  console.log(`### /savePoint : data`);
  console.log(`userId : ${userId}`);
  console.log(`userAccount : ${userAccount}`);
  console.log(`videoUrl : ${videoUrl}`);
  console.log(`watchLength : ${watchLength}`);

  let point = await calcPoint(userId, videoUrl, watchLength);
  console.log(`##### $$$ calc point = ${point}`);
  let pointObj = { 
    point : point,
    userId : userId,
    videoUrl : videoUrl,
    watchLength : watchLength,
    success : false
   };

  if (point != 0) {
    await transferHSC(global.accountList[0], userAccount, point);
    pointObj['success'] = true;
    let currTimeMilli = moment().format('x');
    putItemToDB(DB_COLLECTION['POINT_LOG'], currTimeMilli, pointObj);
  }
  
  res.json(pointObj);
});

/**
 * Video 시청 기록 저장
 * @method post
 * @returns {object}
 */
router.post("/saveVideoLog", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/saveVideoLog");
  let { userId, videoName, watchDate, watchTime, watchComplete, videoUrl, videoTotalLength } = req.body;
  console.log(`### /saveVideoLog : data`);
  console.log(`userId : ${userId}`);
  console.log(`videoName : ${videoName}`);
  console.log(`watchDate : ${watchDate}`);
  console.log(`watchTime : ${watchTime}`);
  console.log(`watchComplete : ${watchComplete}`);
  console.log(`videoTotalLength : ${videoTotalLength}`);

  watchTime = int(watchTime);
  videoTotalLength = int(videoTotalLength);
  watchComplete = watchTime == videoTotalLength - 1 ? true : false;
  let ps = await global.db.collection(DB_COLLECTION["VIDEO_LOG"]);
  ps.doc(userId)
    .collection(userId)
    .doc(videoName)
    .set({
      watchDate: watchDate,
      watchTime: watchTime,
      watchComplete: watchComplete,
      videoUrl: videoUrl,
      videoTotalLength : videoTotalLength
    });
  res.json({code:100});
});

/**
 * 이용내역 불러오기
 * @method post
 * @returns {object}
 */
router.post("/getTransactionLog/:userAccount", async (req, res) => {
  userAgentModel.printUserAgent(
    req.header("user-agent"),
    "/getTransactionLog/:userAccount"
  );
  const userAccount = req.params.userAccount;
  console.log(`### /getTransactionLog/${userAccount} : data`);
  console.log(`userAccount = ${userAccount}`);

  let logObj = await getTransactionLog(userAccount);
  console.log(`logObj = ${logObj}`);
  res.json(logObj);
});

/**
 * 유저 랭킹 가져오기
 * @method get
 * @returns {object}
 */
router.get("/getUserRank", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/getUserRank");

  console.log(`### /getUserRank/ : data`);
  const result = await getAllUserBalance();
  console.log(`result = ${result}`);
  res.json(result);
});

/**
 * 최근 거래한 계정 정보 가져오기
 * @method post
 * @param {string} userAccount
 * @returns {object}
 */
router.post("/getRecentTransferAccount", async (req, res) => {
  userAgentModel.printUserAgent(
    req.header("user-agent"),
    "/getRecentTransferAccount"
  );
  const userAccount = req.body["userAccount"];

  console.log(`### /getRecentTransferAccount/ : data`);
  console.log(`userAccount = ${userAccount}`);

  let result = await getRecentTransferAccount(userAccount);
  result = Object.fromEntries(result);
  console.log(`result =  ${result}`);
  res.json(result);
});

/**
 * 즐겨찾기 리스트 가져오기
 * @method post
 * @param {string} userId
 * @returns {object}
 */
router.post("/getFaviconList", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/getFaviconList");
  const userId = req.body["userId"];

  console.log(`### /getFaviconList : data`);
  console.log(`userId = ${userId}`);

  let result = await getFaviconList(userId);
  console.log(`result =  ${result}`);
  res.json(result);
});

/**
 * 즐겨찾기 추가
 * @method post
 * @param {string} userId
 * @param {string} faviconId
 * @param {string} faviconAddress
 */
router.post("/addFavicon", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/addFavicon");
  const userId = req.body["userId"];
  const faviconId = req.body["faviconId"];
  const faviconAddress = req.body["faviconAddress"];

  console.log(`### /addFavicon/ : data`);
  console.log(`userId = ${userId}`);
  console.log(`faviconId = ${faviconId}`);
  console.log(`faviconAddress = ${faviconAddress}`);

  let faviconObject = {
    owner: userId,
    userId: faviconId,
    userAddress: faviconAddress,
  };

  let result = await addFavicon(userId, faviconObject);
  console.log(`result = ${result}`);
  res.json(result);
});

/**
 * 즐겨찾기 삭제
 * @method post
 * @param {string} userId
 * @param {string} faviconName
 */
router.post("/removeFavicon", async (req, res) => {
  userAgentModel.printUserAgent(req.header("user-agent"), "/removeFavicon");

  res.json(result);
});

module.exports = router;
