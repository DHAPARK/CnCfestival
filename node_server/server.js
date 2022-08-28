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

const cors = require("cors");
app.use(cors());
// const admin = require("firebase-admin");
// const auth = require("firebase-admin/auth");
// const firestore = require("firebase-admin/firestore");
// const Web3 = require('web3');

const {
  send,
  allowedNodeEnvironmentFlags,
  getMaxListeners,
  env,
} = require("process");
const { json } = require("express");
const PORT = 80;

const envConfig = require("./config/envConfig");

app.use(
  session({
    secret: "session_test",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

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
  let quizNum = decodeURIComponent(req.body.quizNum);
  console.log(code);
  console.log(`userId ${userId}`);
  console.log(`quizNum ${quizNum} ${typeof(quizNum)} ${Number(quizNum)} ${typeof(Number(quizNum))}`);

  //fs.writeFileSync(`/submit/${userId}_${quizNum}.py`, code, "utf8", (err) => {
  fs.writeFile(`${userId}_${1}.py`, code, "utf8", (err) => {
    if (err) {
      console.log(`${err}\npython 파일생성에 문제발생`);
    }
    else {
      //fs.readFileSync(`cat /answer/input_answer${quizNum}.txt`, "utf-8", (err, data) => {
      fs.readFile(`cat /answer/input_answer${1}.txt`, "utf-8", (err, data) => {
        if (err) {
          console.log(`${err}\n파일 로딩에 문제발생`);
        }
        console.log(`###answer data = ${data}`)

        // await exec(`cat input${quizNum} | python3 /submit/pf${0}.py`, { shell: true }, (error, stdout) => {
        //   if (error) {
        //     console.log(`stdout ${stdout}`);
        //     console.log(`error ${error}`);
        //     res.json({ code: 100, stdout: stdout, stderr: error.message });
        //   } else {
        //     console.log(`stdout ${stdout}`);
        //     console.log(`error ${error}`);
        //     res.json({ code: 200, stdout: stdout, stderr: error });
        //   }
        // });
      }); 
    }
  });
  //파일제대로 생기나 확인해야함

  //파일이 제대로 생성이 되는걸 확인했으니 "방금 만들어진" 파이썬파일 그대로 컴파일
  
});



// app.post("/testanswer", async (req, res) => {});

const { getStorage, ref, getDownloadURL } = require("firebase-admin/storage");
const { putItemToDB } = require("./utils/DB");
const { RETURN_CODE, DB_COLLECTION } = require("./utils/constant");

global.sessionList = {};

app.listen(PORT, async () => {
  await envConfig.initWeb3();
  await envConfig.initDB();
  moment.tz.setDefault("Asia/Seoul");
  console.log(`${PORT}번호로 서버 실행중...`);
  console.log(moment().format("YYYY-MM-DD HH:mm:ss"));

  // 이미지 url 성공띠
  // let file = global.storage.bucket().file('test_img1.jpeg');
  // const config = {
  //     action: 'read',
  //     expires: '08-20-2030'
  // };

  // file.getSignedUrl(config, (err, url) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     console.log(url);
  // });

  // let sampleUrl1 = 'https://www.youtube.com/watch?v=ED2rOHM1od0';
  // let sampleUrl2 = 'https://www.youtube.com/watch?v=IAMdPn3YCG4';
  // let title_list = [
  //     '출력하기1',
  //     '출력하기2',
  //     '출력하기3',
  //     '주사위 경우의수'
  // ];

  // let category_list = [
  //     '출력',
  //     '출력',
  //     '출력',
  //     '출력'
  // ];

  // let description_list = [
  //     `python 언어에서 가장 기본적인 명령이 출력문이다.
  //     print( )를 이용해 다음 단어를 출력하시오.

  //     Hello

  //     예시
  //     print("Hello")`,

  //     `이번에는 공백( )을 포함한 문장을 출력한다.
  //     다음 문장을 출력해보자.

  //     Hello World
  //     (대소문자에 주의한다.)

  //     참고
  //     print("문장1 문장2")
  //     을 실행시키면 "문장1”, "문장2"가 공백( )을 사이에 두고 출력된다.
  //     print("문장1", "문장2")
  //     도 "문장1"과 "문장2" 사이에 공백( )을 출력한다.`,

  //     `이번에는 다음과 같은 python프로그램의 소스코드를 출력해보자.

  //     print("Hello\nWorld")

  //     위 코드를 정확히 그대로 출력하시오.(공백문자 주의)

  //     print 명령 안에 서식 문자로 \n을 사용하면 줄 바꿈(new line) 문자로 사용된다.

  //     그렇다면 \n을 화면에 그대로 출력하려면 어떻게 해야될까?`,

  //     `1부터 n까지, 1부터 m까지 숫자가 적힌 서로 다른 주사위 2개를 던졌을 때,
  //     나올 수 있는 모든 경우를 출력해보자.

  //     예시
  //     ...
  //     for i in range(1, n+1) :
  //       for j in range(1, m+1) :
  //         print(i, j)
  //     ...

  //     참고
  //     위 코드는
  //     바깥쪽의 i 값이 1부터 n까지 순서대로 바뀌는 각각의 동안에
  //     안쪽의 j 값이 다시 1부터 m까지 변하며 출력되는 코드이다.

  //     조건선택 실행구조 안에 다른 조건선택 실행구조를 넣어 처리할 수 있는 것과 마찬가지로
  //     반복 실행구조 안에 다른 반복 실행구조를 넣어 처리할 수 있다.

  //     원하는 형태로 실행 구조를 결합하거나 중첩시킬 수 있다.`
  // ];

  // for(let i = 1; i<=4; i++) {
  //     let number = i;
  //     let title = title_list[i];
  //     let category = category_list[i];
  //     let description = description_list[i];

  //     let obj = {
  //         number: number,
  //         title: title,
  //         category: category,
  //         description: description
  //     };

  //     putItemToDB(DB_COLLECTION['QUESTION'], number, obj);
  // }

  //envConfig.generateV4ReadSignedUrl().catch(console.error);
});
