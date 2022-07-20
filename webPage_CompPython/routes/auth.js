const express = require('express');
const router = express.Router();
const userAgentModel = require('../models/userAgentModel');


//일단 교수님 컴퓨터에 또 올릴지, 내 aws에 올릴지 모르니 url을 app쪽이랑 차별화해둔다 그래봤자 뒤에 Web만 붙일거지만
/**
         * 회원가입
         * @method post
         * @param {string} userid
         * @param {string} userpw
         * @param {string} username
         * @param {string} useremail
         * @param {string} userphone
         * @param {string} year
         * @param {string} month
         * @param {string} day
*/
router.post('/joinMemberWeb/:userid', async (req,res)=>{
    //요청온 컴퓨터의 사양
    userAgentModel.printUserAgent(req.header('user-agent'),"/joinMember/:userid");
    
    const userid = req.params.userid;
    const userpw = req.body["password"];
    const username = req.body["name"];
    const useremail = req.body["useremail"];
    const userphone = req.body["userphone"];
    const year = req.body["year"];
    const month = req.body["month"];
    const day = req.body["day"];

    console.log(`### /joinMember/${userid} : data`);
    console.log(`userid = ${userid}`);
    console.log(`userpw = ${userpw}`);
    console.log(`username = ${username}`);
    console.log(`userphone = ${userphone}`);
    console.log(`YY.MM.DD = ${year}.${month}.${day}`);

    userSignUp(userid,userpw,username,useremail,userphone,year,month,day);
    
    const result = {};
    result["success"] = 200
    result["msg"] = "join success";
    res.json(result);
})



/**
 * 회원 정보 불러오기
 * @method get
 * @param {string} userid
 * @param {string} userpw
 */
router.get('/getMemberWeb/:userid/:userpw', async (req,res)=>{
    userAgentModel.printUserAgent(req.header('user-agent'),"/getMember/:userid/:userpw");

    const userid = req.params.userid;
    const userpw = req.params.userpw;

    if(await isIdInDb(userid)) {
        const userInfo = await getUserInfo(userid);    
        console.log(`### /getMember/${userid}/${userpw} : data`);
        console.log(`userid = ${userid}`);
        console.log(`userpw = ${userpw}`);
        console.log(`userInfo = ${userInfo}`);

        userlogin(userid,userpw).then((member)=>{
            console.log(`member = ${member}`);  
            member == 100 ? res.json(userInfo) : res.json(member);
        });
    } else{
        res.json(RETURN_CODE['NONE_ID']);
    }
});


module.exports = router