const asyncify = require('express-asyncify');
const express = require('express');
const app = asyncify(express());
const fs = require('fs');

const bodyParser = require('body-parser');

const BigNumber = require('bignumber.js');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const dateUtils = require('date-utils');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { send, allowedNodeEnvironmentFlags, getMaxListeners } = require('process');
const { json } = require('express');
const PORT = 80;

const envConfig = require('./config/envConfig');
const exRouter = require('./router/module1');
const { hsContract, accountList } = require('./config/envConfig');

app.use('/', exRouter);

const test = () => {
    console.log(`### ${hsContract}`);
    console.log(`### ${accountList}`);
};

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.listen(PORT, () => {
    moment.tz.setDefault('Asia/Seoul');
    console.log(`${PORT}번호로 서버 실행중...`);
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    test();
});
