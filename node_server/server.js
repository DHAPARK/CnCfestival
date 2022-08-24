const asyncify = require('express-asyncify');
const express = require('express');
const app = asyncify(express());
const fs = require('fs');

const bodyParser = require('body-parser');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const dateUtils = require('date-utils');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const util = require('require');
const exec = util.promisify(require('child_process').exec);

// const admin = require("firebase-admin");
// const auth = require("firebase-admin/auth");
// const firestore = require("firebase-admin/firestore");
// const Web3 = require('web3');

const { send, allowedNodeEnvironmentFlags, getMaxListeners, env } = require('process');
const { json } = require('express');
const PORT = 80;

const envConfig = require('./config/envConfig');

app.use(session({
    secret:'session_test'
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/resource/public'));
app.use(express.static(__dirname + '/resource/img'));

const appUtilRouter = require('./router/app_route/util');
const appUserRouter = require('./router/app_route/user');
const appTransactionRouter = require('./router/app_route/transaction');

// 앱 요청 url 변경해야함
app.use('/', appUtilRouter);
app.use('/', appUserRouter);
app.use('/', appTransactionRouter);

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

const webUrlRouter = require('./router/web_route/url');
const webUtilRouter = require('./router/web_route/util');
const webUserRouter = require('./router/web_route/user');
const webTransactionRouter = require('./router/web_route/transaction');

// 웹 요청 url 변경해야함
app.use('/web', webUrlRouter);

app.use('/web/util', webUtilRouter);
// => /checkIdDuplicate/:userid
// => /getMyBalance/:userAccount
// => /getGpsInfo
// => /getTransactionLog/:userAccount
// => /getUserRank
// => /getRecentTransferAccount

app.use('/web/user', webUserRouter);
// => /login/:userid
// => /getMember/:userid/:userpw
// => /ModifyMyInfo/:userId

app.use('/web/transaction', webTransactionRouter);
// => /hscRemittance
// => /hscPayment


app.post('/test', (req, res) => {
    let code = decodeURIComponent(req.body.code);
    
    fs.writeFileSync(`pf${0}.py`, code, "utf8", (err)=>{
        if(err){
            console.log(`${err}\npython 파일생성에 문제발생`);
        }
    })
    //파일제대로 생기나 확인해야함
    
    //파일이 제대로 생성이 되는걸 확인했으니 "방금 만들어진" 파이썬파일 그대로 컴파일
    const {stdout, stderr} = await exec('python3', [`pf${0}.py`]);
    // const spawn = require("child_process").spawn;
    // const result = spawn('python3',[`pf${0}.py`]);
    console.log(`stdout ${stdout}`);
    console.log(`stderr ${stderr}`);
    res.json({stdout, stderr});
})

const { getStorage, ref, getDownloadURL } = require("firebase-admin/storage");
const { putItemToDB } = require('./utils/DB');
const { RETURN_CODE, DB_COLLECTION } = require('./utils/constant');

global.sessionList = {};

app.listen(PORT, async () => {
    await envConfig.initWeb3();
    await envConfig.initDB();
    moment.tz.setDefault('Asia/Seoul');
    console.log(`${PORT}번호로 서버 실행중...`);
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    
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
    // for(let i = 1; i<=10; i++) {
    //     let video = `video${i}`;
    //     let name = `name${i}`;
    //     let description = `video url ${i}th example`;
    //     let videoUrl = i <= 5 ? sampleUrl1 : sampleUrl2;
    //     let videoLength = 5 * i;

    //     let obj = {
    //         name: name,
    //         description: description,
    //         videoUrl: videoUrl,
    //         videoLength: videoLength
    //     };

    //     putItemToDB(DB_COLLECTION['VIDEO'], video, obj);
    // }


    //envConfig.generateV4ReadSignedUrl().catch(console.error);
});
