const express = require('express');
const app = express();
const fs = require('fs');
app.set('port',process.env.PORT || 8080);

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const auth = require("firebase-admin/auth");
const serviceAccount = require("./config/hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");


//Hscoin 관련 정보
const HSCOIN_ADDRESS = '0xF2487613e9a890B6AaC89cDcEDBA8aa62A7Dd380'; // hscoin 컨트랙트 주소
const HSCOIN_JSON_FILE = '../hscoin-contract/build/contracts/Hscoin.json';
const HSCOIN_JSON_PARSED = JSON.parse(fs.readFileSync(HSCOIN_JSON_FILE));
const HSCOIN_ABI = HSCOIN_JSON_PARSED.abi;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const login = auth.getAuth();
const db = firestore.getFirestore();

const DB_COLLECTION = {
    'USERS':'users',
    'FRANCHISE':'franchise',
    'TRANSACTION_LOG':'transaction_log',
    'TRANSACTION_HASH':'transaction_hash',
    'FAVICON':'favicon'
};

//각 페이지들 router 설정
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

//각 페이지들 router 설정 후 미들웨어 등록
app.use('/',pageRouter);
app.use('/auth',authRouter);

/**
 * 회원가입 함수
 * @param {string} userid 
 * @param {string} userpw 
 * @param {string} username 
 * @param {string} useremail 
 * @param {string} userphone 
 * @param {string} year 
 * @param {string} month 
 * @param {string} day 
 */
async function userSignUp(userid,userpw,username,useremail,userphone,year,month,day) {
    //let accountAddress = await web3.eth.personal.newAccount(userpw);
    let accountAddress = await web3.eth.personal.newAccount(userpw);
    await transferHSC(accountList[0], accountAddress, 100);
    await transferETH(accountList[0], accountAddress, 1000);
    db.collection(DB_COLLECTION["USERS"]).doc(userid).set({
        userid: userid,
        userpw: userpw,
        username: username,
        useremail: useremail,
        userphone: userphone,
        year: year,
        month: month,
        day: day,
        accountAddress: accountAddress,
        accountPassword: userpw
    });
    console.log(`### userSignUp Info`);
    console.log(`userid = ${userid}`);
    console.log(`userpw = ${userpw}`);
    console.log(`username = ${username}`);
    console.log(`useremail = ${useremail}`);
    console.log(`userphone = ${userphone}`);
    console.log(`year.month.day = ${year}.${month}.${day}`);
    console.log(`accountAddress = ${accountAddress}`);
    console.log(`accountPassword = ${accountPassword}`);
    console.log(`### userSignUp Complete`);
}



/**
 * 유저 로그인 함수
 * @param {string} id 
 * @param {string} pw 
 */
function userlogin(id,pw) {
    return new Promise((res,rej)=>{
        let ps = db.collection('users').doc(id);
        let password= "";
        let member = {};
    
        ps.onSnapshot(docSnapshot => {
            try{
                password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
                userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
                userAccount = docSnapshot["_fieldsProto"]["accountAddress"]["stringValue"]

                if (password == pw){
                    member = {
                        "userid":`${id}`,
                        "password":`${password}`,
                        "userAccount":`${userAccount}`
                    }
                    console.log(`### return code = ${RETURN_CODE['SUCCESS']}`);
                    res(RETURN_CODE['SUCCESS']);
                }
                else{
                    console.log(`### return code = ${RETURN_CODE['PASSWORD_ERR']}`);
                    res(RETURN_CODE['PASSWORD_ERR']);
                }
            }catch(e){
                console.log(`1_moduletest.js userlogin 메서드에서 ${e} 오류발생`);
            }
        },(err)=>{
            console.log(`${err}`);
        })
    });
}




app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기중...');
})