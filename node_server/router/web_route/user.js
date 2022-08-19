const express = require('express');
const router = express.Router();
const userAgentModel = require('../../models/userAgentModel');
const { suppressDeprecationWarnings } = require("moment");

const { RETURN_CODE, DB_COLLECTION } = require('../../utils/constant');
const { modifyDBItem } = require('../../utils/DB');
const { getUserInfo } = require('../../utils/inquiry');
const { isIdInDb, isPasswordRight, userlogin, userSignUp } = require('../../utils/validation');

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
    console.log(`### ${JSON.stringify(req.body)}`);

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
router.post('/login', async (req,res)=>{
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
            if (returnCode == 100) {
                userInfo.isLogin = true;
                req.session[userid] = userInfo;
                global.sessionList[userid] = req.session;
                //req.session.destroy(); 세션 삭제
                
                res.json(userInfo);
            } else {
                res.json(returnCode);
            }
        });
    } else{
        res.json(RETURN_CODE['NONE_ID']);
    }
});

/**
 * 개인 정보 수정
 * @method post
 * @param {string} userid
 * @param {string} userpw
 * @param {string} username
 * @param {string} useremail
 * @param {string} userphone
 * @param {string} myOriginPw
 * @return {obejct} 결과 코드 값
 */
router.post('/modifyUser', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/modifyUser");
    const userid = req.body["userid"];
    const userpw = req.body["password"];
    const username = req.body["username"];
    const useremail = req.body["useremail"];
    const userphone = req.body["userphone"];
    const userOriginPw = req.body['myOriginPw'];

    console.log(`### /modifyUser : data`);
    console.log(`userid = ${userid}`);
    console.log(`userpw = ${userpw}`);
    console.log(`username = ${username}`);
    console.log(`useremail = ${useremail}`);
    console.log(`userphone = ${userphone}`);
    console.log(`userOriginPw = ${userOriginPw}`);

    let modifiedInfo = {
        userpw:userpw,
        username:username,
        useremail:useremail,
        userphone:userphone,
    };
    let result

    if(await isPasswordRight(userid, userOriginPw)) {
        result = await modifyDBItem(DB_COLLECTION["USERS"], userid, modifiedInfo);
    } else {
        result = RETURN_CODE['PASSWORD_ERR'];
    }
    console.log(`result = ${result}`);
    res.json(result);
})

module.exports = router;