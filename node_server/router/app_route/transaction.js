const express = require('express');
const router = express.Router();
const userAgentModel = require('../../models/userAgentModel');
const { suppressDeprecationWarnings } = require("moment");

const { RETURN_CODE } = require('../../utils/constant');
const { remittanceCoin, paymentCoin, buyProduct } = require('../../utils/transaction');
const { isPasswordRight } = require('../../utils/validation');
const SUCCESS_CODE = "SUCCESS_CODE";

/**
 * 송금
 * @method post
 * @param {string} userId 전송 유저 아이디
 * @param {string} userPassword 전송 유저 패스워드
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @returns {object} 성공 코드 
 * (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201, 비밀번호 오류: 202)
 */
router.post('/hscRemittance', async (req, res)=> {
    userAgentModel.printUserAgent(req.header('user-agent'),"/hscRemittance");
    
    const userId = req.body["userId"];
    const userPassword = req.body["userPassword"];
    const senderAddress = req.body["senderAddress"];
    const receiverAddress = req.body["receiverAddress"];
    const amount = req.body["amount"];
    const result = {};

    console.log(`### /hscRemittance : data`);
    console.log(`userId = ${userId}`);
    console.log(`userPassword = ${userPassword}`);
    console.log(`senderAddress = ${senderAddress}`);
    console.log(`receiverAddress = ${receiverAddress}`);
    console.log(`amount = ${amount}`);
    
    if(await isPasswordRight(userId, userPassword)) {
        result[SUCCESS_CODE] = await remittanceCoin(senderAddress, receiverAddress, amount);
    } else {
        result[SUCCESS_CODE] = RETURN_CODE['PASSWORD_ERR'];
    }
    console.log(`result = ${result}`);
    res.json(result);
})

/**
 * 결제
 * @method post
 * @param {string} userId 전송 유저 아이디
 * @param {string} userPassword 전송 유저 패스워드
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @returns {object} 성공 코드 
 * (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201, 비밀번호 오류: 202)
 */
router.post('/hscPayment', (req, res)=> {
    userAgentModel.printUserAgent(req.header('user-agent'),"/hscPayment");

    const userId = req.body["userId"];
    const userPassword = req.body["userPassword"];
    const senderAddress = req.body["senderAddress"];
    const receiverAddress = req.body["receiverAddress"];
    const amount = req.body["amount"];
    const result = {};

    console.log(`### /hscPayment : data`);
    console.log(`userId = ${userId}`);
    console.log(`userPassword = ${userPassword}`);
    console.log(`senderAddress = ${senderAddress}`);
    console.log(`receiverAddress = ${receiverAddress}`);
    console.log(`amount = ${amount}`);

    isPasswordRight(userId, userPassword).then(isSucc => {
        if(isSucc == true) {
            paymentCoin(senderAddress, receiverAddress, amount).then(code => {
                result['SUCCESS_CODE'] = code;
                console.log(`result = ${result}`);
                res.json(result);
            })              
        } else {
            result[SUCCESS_CODE] = RETURN_CODE['PASSWORD_ERR'];
            console.log(`result = ${result}`);
            res.json(result);
        }
    });
})


/**
 * 결제
 * @method post
 * @param {string} userId 전송 유저 아이디
 * @param {string} userPassword 전송 유저 패스워드
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @param {string} productName 상품 이름
 * @returns {object} 성공 코드 
 * (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201, 비밀번호 오류: 202)
 */
router.post('/buyProductRequest', (req, res)=> {
    userAgentModel.printUserAgent(req.header('user-agent'),"/buyProductRequest");

    const userId = req.body["userId"];
    const userPassword = req.body["userPassword"];
    const senderAddress = req.body["senderAddress"];
    const receiverAddress = req.body["receiverAddress"];
    const amount = req.body["amount"];
    const productName = req.body['productName'];
    const result = {};
    
    console.log(`### /buyProductRequest : data`);
    console.log(`userId = ${userId}`);
    console.log(`userPassword = ${userPassword}`);
    console.log(`senderAddress = ${senderAddress}`);
    console.log(`receiverAddress = ${receiverAddress}`);
    console.log(`amount = ${amount}`);
    console.log(`productName = ${productName}`);
    
    isPasswordRight(userId, userPassword).then(isSucc => {
        if(isSucc == true) {
            buyProduct(senderAddress, receiverAddress, amount, productName).then(code => {
                result['SUCCESS_CODE'] = code;
                console.log(`result = ${result}`);
                res.json(result);
            })              
        } else {
            result[SUCCESS_CODE] = RETURN_CODE['PASSWORD_ERR'];
            console.log(`result = ${result}`);
            res.json(result);
        }
    });
})

module.exports = router;