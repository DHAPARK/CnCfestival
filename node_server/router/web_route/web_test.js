const express = require('express');
const router = express.Router();
const userAgentModel = require('../../models/userAgentModel');

const { RETURN_CODE, DB_COLLECTION } = require('../../utils/constant');
const { modifyDBItem } = require('../../utils/DB');
const { getUserInfo } = require('../../utils/inquiry');
const { isIdInDb, isPasswordRight, userlogin, userSignUp } = require('../../utils/validation');

router.get('/index',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/index");

    res.render('index');
})

router.get('/regist',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/regist");
    
    res.render('regist1'); // 페이지 이름이 regist1인 이유 ?
})

/**
 * 미리 만들어 놓은 url 라우팅 시작
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

router.get('/market',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/market");
    
    res.render('market');
})

router.get('/menuList1',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/menuList1");
    
    res.render('menuList1'); // 페이지 이름이 menuList1인 이유?
})

router.get('/multipleChoice',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/multipleChoice");
    
    res.render('multipleChoice');
})

router.get('/mypage',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/mypage");
    
    res.render('mypage');
})

router.get('/solution',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/solution");
    
    res.render('solution1'); // 페이지 이름이 solution1인 이유 ?
})

router.get('/video',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/video");
    
    res.render('video');
})

router.get('/workBookPython',(req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/workBookPython");
    
    res.render('workBookPython');
})
/**
 * 미리 만들어 놓은 url 라우팅 끝
 */



/**
 * 회원가입
 * @method post
 * @param {string} userid
 * @param {string} userpw
 * @param {string} username
 * @param {string} useremail
 * @param {string} userphone
*/
router.post('/registUser', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/registUser");
    console.log(`### ${req.data}`);
    console.log(JSON.stringify(req));


    const userid = req.body['userid'];
    const userpw = req.body["password"];
    const username = req.body["name"];
    const useremail = req.body["useremail"];
    const userphone = req.body["userphone"];
    const year = 1;
    const month = 2;
    const day = 3;

    console.log(`### /registUser : data`);
    console.log(`userid = ${userid}`);
    console.log(`userpw = ${userpw}`);
    console.log(`username = ${username}`);
    console.log(`userphone = ${userphone}`);
    console.log(`YY.MM.DD = ${year}.${month}.${day}`);

    // 앱쪽 로그인에도 year, month, day 가 포함되어 있어
    // 앱과 같이 작업할 때 변경 시도
    userSignUp(userid,userpw,username,useremail,userphone,year,month,day);
    
    const result = {};
    result["success"] = 200;
    result["msg"] = "join success";
    // res.json(result);
    res.render('index', {result:RETURN_CODE['SUCCESS']});
})

/**
 * 회원 정보 불러오기
 * @method post
 * @param {string} userid
 * @param {string} userpw
 */
router.get('/login', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/login");

    const userid = req.body['userid'];
    const userpw = req.body['userpw'];

    if(await isIdInDb(userid)) {
        const userInfo = await getUserInfo(userid);    
        console.log(`### /login : data`);
        console.log(`userid = ${userid}`);
        console.log(`userpw = ${userpw}`);
        console.log(`userInfo = ${userInfo}`);

        userlogin(userid,userpw).then((returnCode)=>{
            console.log(`login returnCode = ${returnCode}`);  
            returnCode == 100 ? res.json(userInfo) : res.json(returnCode);
        });
    } else{
        res.json(RETURN_CODE['NONE_ID']);
    }
});

module.exports = router