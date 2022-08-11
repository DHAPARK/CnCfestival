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

const admin = require("firebase-admin");
const auth = require("firebase-admin/auth");
const firestore = require("firebase-admin/firestore");
const Web3 = require('web3');

const { send, allowedNodeEnvironmentFlags, getMaxListeners } = require('process');
const { json } = require('express');
const PORT = 80;

const envConfig = require('./config/envConfig');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));

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

const webTestRouter = require('./router/web_route/web_test');
const webUtilRouter = require('./router/web_route/util');
const webUserRouter = require('./router/web_route/user');
const webTransactionRouter = require('./router/web_route/transaction');

// 웹 요청 url 변경해야함
app.use('/web', webTestRouter);

// app.use('/web/util', webUtilRouter);
// => /checkIdDuplicate/:userid
// => /getMyBalance/:userAccount
// => /getGpsInfo
// => /getTransactionLog/:userAccount
// => /getUserRank
// => /getRecentTransferAccount

// app.use('/web/user', webUserRouter);
// => /joinMember/:userid
// => /getMember/:userid/:userpw
// => /ModifyMyInfo/:userId

// app.use('/web/transaction', webTransactionRouter);
// => /hscRemittance
// => /hscPayment


app.listen(PORT, async () => {
    await envConfig.initWeb3();
    moment.tz.setDefault('Asia/Seoul');
    console.log(`${PORT}번호로 서버 실행중...`);
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
});
