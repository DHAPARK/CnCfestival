const { RETURN_CODE, DB_COLLECTION } = require('./constant');
const { accountList, web3, db } = require('../config/envConfig');

const { transferETH, transferHSC } = require('./transaction');

/////////////////////////////////////////
// 유효성 검사 함수

/**
 * 해당 주소가 DB에 존재하는지 확인
 * @param {string} inquiryAddress 조회할 계정 주소
 * @returns {boolean} 존재 여부
 */
 async function isAddressInDB(inquiryAddress) {
    let result = false;
    let userInfoRef = await db.collection(DB_COLLECTION['USERS']);
    let snapShot = await userInfoRef.where('accountAddress', '==', inquiryAddress).get();
    console.log(`### ${inquiryAddress} isAddressInDB ${!snapShot.empty}`);
    return !snapShot.empty;
}

/**
 * 유저의 아이디 비밀번호 정보 대조
 * @param {string} userId 유저 아이디
 * @param {string} userPassword  유저 패스워드
 * @returns {boolean} 일치 여부
 */
async function isIdInDb(userId) {
    let userInfoRef = await db.collection(DB_COLLECTION['USERS']);
    let snapShot = await userInfoRef.where('userid', '==', userId).get();
    console.log(`### ${userId} isAddressInDB ${!snapShot.empty}`);
    return !snapShot.empty;
}

/**
 * 유저의 아이디 비밀번호 정보 대조
 * @param {string} userId 유저 아이디
 * @param {string} userPassword  유저 패스워드
 * @returns {boolean} 일치 여부
 */
 async function isPasswordRight(userId, userPassword) {
    let ps = await db.collection(DB_COLLECTION['USERS']).doc(userId).get();
    let password = ps.data().userpw;
    let isSuccess = false;
    isSuccess = (password == userPassword ? true : false);
    console.log(`### userId = ${userId}, userPassword = ${userPassword} isSuccess ${isSuccess}`);
    return isSuccess;
}

/**
 * 회원가입 시 유저 아이디가 중복되는지 확인
 * @param {string} userid 
 */
 function checkIdDuplicate(userid){
    var password = "";
    return new Promise((resolve,reject)=>{
        let ps = db.collection('users').doc(userid);
        ps.onSnapshot(docSnapshot => {
            try{
                password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
                userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
            }catch(e){
                if(password === ""){
                    resolve('200');
                    console.log(`### userId = ${userid} is not duplicated`);
                    return false;
                }
            }finally{
                if(password !== ""){
                    resolve('100');
                    console.log(`### userId = ${userid} is duplicated`);
                }
            }
        },(err)=>{
            console.log(`${err}`);
        })
    })
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

// 유효성 검사, 회원 관련 함수
/////////////////////////////////////////

module.exports = {
    isAddressInDB: isAddressInDB,
    isIdInDb: isIdInDb, 
    isPasswordRight: isPasswordRight, 
    checkIdDuplicate: checkIdDuplicate, 
    userlogin: userlogin, 
    userSignUp: userSignUp 
}