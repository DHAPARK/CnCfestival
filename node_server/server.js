const asyncify = require("express-asyncify");
const express = require("express");
const app = asyncify(express());
const fs = require("fs");

const bodyParser = require("body-parser");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const dateUtils = require("date-utils");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");

const cors = require("cors");
app.use(cors());

// const admin = require("firebase-admin");
// const auth = require("firebase-admin/auth");
// const auth = require("firebase-admin/auth");
// const firestore = require("firebase-admin/firestore");
// const Web3 = require('web3');

const {
  send,
  allowedNodeEnvironmentFlags,
  getMaxListeners,
  env,
  resourceUsage,
} = require("process");

const { json } = require("express");
const PORT = 80;
const { getUserAccount, getQuizLog } = require("./utils/inquiry");
const { transferHSC } = require("./utils/transaction");
const { putItemToDB } = require("./utils/DB");
const { DB_COLLECTION } = require("./utils/constant");
const envConfig = require("./config/envConfig");

function isAlphaNumCheck(str) {
  const rgxstr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    ":",
    "(",
    ")",
    "_",
    " ",
    "\n",
    "=",
    '"',
    "'",
    "+",
    "-",
    "*",
    "/",
    "!",
    "#",
    "@",
    "$",
    "%",
    "^",
    "&",
    "\\",
    "/",
    "|",
    ".",
    ",",
    "?",
    "<",
    ">",
    "`",
    "~",
    "[",
    "]",
    "\t",
    "/t",
  ];
  var Flag = false;
  for (var i = 0; i < rgxstr.length; i++) {
    if (str == rgxstr[i]) {
      Flag = true;
    }
  }

  return Flag;
}

app.use(
  session({
    secret: "session_test",
  })
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/resource/public"));
app.use(express.static(__dirname + "/resource/img"));

const appUtilRouter = require("./router/app_route/util");
const appUserRouter = require("./router/app_route/user");
const appTransactionRouter = require("./router/app_route/transaction");

// 앱 요청 url 변경해야함
app.use("/", appUtilRouter);
app.use("/", appUserRouter);
app.use("/", appTransactionRouter);

// 다음과 같이 변경 ( => 관련 url )
// app.use('/app/util', appUtilRouter);
// => /checkIdDuplicate/:userid
// => /getMyBalance/:userAccount
// => /getGpsInfo
// => /getTransactionLog/:userAccount
// => /getUserRank
// => /getRecentTransferAccount

// app.use('/app/user', appUserRouter);
// => /joinMember/:userid
// => /getMember/:userid/:userpw
// => /ModifyMyInfo/:userId

// app.use('/app/transaction', appTransactionRouter);
// => /hscRemittance
// => /hscPayment

const webUrlRouter = require("./router/web_route/url");
const webUtilRouter = require("./router/web_route/util");
const webUserRouter = require("./router/web_route/user");
const webTransactionRouter = require("./router/web_route/transaction");

// 웹 요청 url 변경해야함
app.use("/web", webUrlRouter);

app.use("/web/util", webUtilRouter);
// => /checkIdDuplicate/:userid
// => /getMyBalance/:userAccount
// => /getGpsInfo
// => /getTransactionLog/:userAccount
// => /getUserRank
// => /getRecentTransferAccount

app.use("/web/user", webUserRouter);
// => /login/:userid
// => /getMember/:userid/:userpw
// => /ModifyMyInfo/:userId

app.use("/web/transaction", webTransactionRouter);
// => /hscRemittance
// => /hscPayment

app.post("/test", async (req, res) => {
  let code = decodeURIComponent(req.body.code);
  let userId = decodeURIComponent(req.body.userId);
  let userAccount = await getUserAccount(userId);
  let quizNum = decodeURIComponent(req.body.quizNum).replaceAll("'", "");
  console.log(code);

  let fileName = `${userId}_${quizNum}.py`;
  let submitOutputFileName = `${userId}_${quizNum}.txt`;

  for (let i = 0; i < code.length; i++) {
    if (!isAlphaNumCheck(code[i])) {
      code = code.replace(code[i], " ");
    }
  }

  fs.writeFileSync(
    process.cwd() + `/submit/${fileName}`,
    code,
    "utf8",
    (err) => {
      if (err) {
        console.log(`${err}\npython 파일생성에 문제발생`);
      }
    }
  );
  console.log(`${fileName} 생성 완료`);

  let inputData = fs
    .readFileSync(
      process.cwd() + `/answer/input_answer${quizNum}.txt`,
      "utf8",
      (err) => {
        if (err) {
          console.log(`${err}\n파일 로딩에 문제발생`);
        }
      }
    )
    .toString()
    .split("\n");
  console.log(`inputData 읽기 완료`);

  inputData.pop();

  console.log(inputData, typeof inputData);
  fs.writeFileSync(
    process.cwd() + `/submit/${submitOutputFileName}`,
    "",
    "utf8",
    (err) => {
      if (err) {
        console.log(`${err}\noutput 파일생성에 문제발생`);
      }
    }
  );
  console.log(`${submitOutputFileName} 생성 완료`);

  for (let data of inputData) {
    try {
      let { stdout, error } = await exec(
        `echo ${data} | python3 ` + process.cwd() + `/submit/${fileName}`,
        { shell: true }
      );

      fs.appendFileSync(
        process.cwd() + `/submit/${submitOutputFileName}`,
        stdout,
        "utf8",
        (err) => {
          if (err) {
            console.log(`${err}\noutput 파일생성에 문제발생`);
          }
        }
      );
    } catch (error) {
      if (error) {
        console.log(JSON.stringify(error));
        res.json({ code: 100, stderr: error.message });
      }
    }
  }

  let outputData = fs
    .readFileSync(
      process.cwd() + `/answer/output_answer${quizNum}.txt`,
      "utf8",
      (err) => {
        if (err) {
          console.log(`${err}\n파일 로딩에 문제발생`);
        }
      }
    )
    .toString()
    .split("\n");
  console.log(`outputData 읽기 완료`);

  outputData.pop();

  console.log(outputData, typeof outputData);

  let userOutputData = fs
    .readFileSync(
      process.cwd() + `/submit/${submitOutputFileName}`,
      "utf8",
      (err) => {
        console.log(`### useroutputdata 읽는 중`);
        if (err) {
          console.log(`${err}\n파일 로딩에 문제발생`);
        }
      }
    )
    .toString()
    .split("\n");
  console.log(`${submitOutputFileName} 읽기 완료`);
  userOutputData.pop();

  console.log(userOutputData, typeof userOutputData);

  let total = outputData.length;
  let correct = 0;

  outputData.forEach(async (data, index, arr) => {
    if (data == userOutputData[index]) {
      correct += 1;
    }
    console.log(`data = ${data}, user = ${userOutputData[index]}`);
    console.log(`total = ${total}, correct = ${correct}`);
    if (index + 1 == total) {
      let pass = correct == total ? true : false;
      let stdout = {
        pass: pass,
        correct: correct,
        total: total,
        percentage: (correct / total) * 100,
      };
      let documentName = `${userId}_${quizNum}`;
      if (!(await getQuizLog(documentName))) {
        await transferHSC(global.accountList[0], userAccount, 10);
      }

      let quizSolveObj = {
        solved: true,
      };
      putItemToDB(DB_COLLECTION["QUIZ_LOG"], documentName, quizSolveObj);
      res.json({ code: 200, stdout: stdout });
    }
  });
});

// app.post("/testanswer", async (req, res) => {});

const { getStorage, ref, getDownloadURL } = require("firebase-admin/storage");
const { getProductInfo } = require("./utils/inquiry");
const { modifyAddressInfo } = require("./utils/DB");

global.sessionList = {};

app.listen(PORT, async () => {
  await envConfig.initWeb3();
  await envConfig.initDB();
  moment.tz.setDefault("Asia/Seoul");
  console.log(`${PORT}번호로 서버 실행중...`);
  console.log(moment().format("YYYY-MM-DD HH:mm:ss"));

  let address1 = "0x11699dBe11FA633e3Dd58926dcC60c110712D542";
  let address2 = "0xF68026e1d8222F3e51a44c25b06dD9E2cAD772C8";
  let productInfoList = await getProductInfo();
  for (let i = 0; i < productInfoList.length; i++) {
    let documentName = productInfoList[i]["productId"];
    let address = i < productInfoList.length / 2 ? address1 : address2;
    let modifyObj = {
      address: address,
    };
    let result = await modifyAddressInfo(
      DB_COLLECTION["PRODUCT"],
      documentName,
      modifyObj
    );
    console.log(`result[${i}] = ${result}`);
  }
});
