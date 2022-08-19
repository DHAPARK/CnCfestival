const express = require('express');
const router = express.Router();
const userAgentModel = require('../../models/userAgentModel');

const { balanceInquiry, getTransactionLog, getProductInfo, getVideoInfo } = require('../../utils/inquiry');

router.get('/index',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/index");

    res.render('index');
})

router.get('/regist',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/regist");
    
    res.render('regist'); // 페이지 이름이 regist1인 이유 ?
})

/**
 * 미리 만들어 놓은 웹 url 라우팅 시작
 * 1. 페이지 이름에 숫자 1이 붙은 이유 질문 ?
 * 2. 추가로 필요한 요청 질문 ?
 */
router.get('/answer',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/answer");
    
    res.render('answer');
})

router.get('/introduce',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/introduce");
    
    res.render('introduce');
})

router.get('/market', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/market");

    const marketInfo = await getProductInfo();
    console.log(`result = ${marketInfo}`);

    res.render('market', {marketInfo: marketInfo});
})

router.get('/menuList',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/menuList");
    
    res.render('menuList'); // 페이지 이름이 menuList1인 이유?
})

router.get('/multipleChoice',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/multipleChoice");
    
    res.render('multipleChoice');
})

router.get('/mypage/:userId', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/mypage");
    
    const userId = req.params.userId;
    const userInfo = global.sessionList[userId][userId];
    const accountAddress = userInfo['accountAddress'];

    let myInfo = {};

    myInfo['balance'] = await balanceInquiry(accountAddress);
    myInfo['transferLog'] = await getTransactionLog(accountAddress);
    
    res.render('mypage', {info: myInfo});
})

router.get('/solution',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/solution");
    
    res.render('solution'); // 페이지 이름이 solution1인 이유 ?
})

router.get('/video', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/video");
    
    const videoInfo = await getVideoInfo();
    console.log(`result = ${videoInfo}`);

    res.render('video', {videoInfo: videoInfo});
})

router.get('/workBookPython',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/workBookPython");
    
    res.render('workBookPython');
})
/**
 * 미리 만들어 놓은 웹 url 라우팅 끝
 */





module.exports = router