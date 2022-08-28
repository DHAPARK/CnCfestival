const BigNumber = require('bignumber.js');
const moment = require('moment');

const { RETURN_CODE, DB_COLLECTION, TRANSACTION_TYPE } = require('./constant');
const { putItemToDB } = require('./DB');
const { balanceInquiry, getUserId, getAccountPassword } = require('./inquiry');

/**
 * 해당 주소가 DB에 존재하는지 확인
 * @param {string} inquiryAddress 조회할 계정 주소
 * @returns {boolean} 존재 여부
 */
 async function isAddressInDB(inquiryAddress) {
    let result = false;
    let userInfoRef = await global.db.collection(DB_COLLECTION['USERS']);
    let snapShot = await userInfoRef.where('accountAddress', '==', inquiryAddress).get();
    console.log(`### ${inquiryAddress} isAddressInDB ${!snapShot.empty}`);
    return !snapShot.empty;
}

/**
 * ETH 전송 함수
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액 (1ETH 단위)
 */
 async function transferETH(senderAddress, receiverAddress, amount) {
    let decimals = await global.hsContract.methods.decimals().call();
    decimals = parseInt(decimals);
    await global.web3.eth.sendTransaction({
        from:senderAddress,
        to:receiverAddress,
        value: new BigNumber(amount * 10 ** decimals)
    });
}

/**
 * HSC 전송 함수
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액(1HSC 단위)
 */
 async function transferHSC(senderAddress, receiverAddress, amount) {
    let decimals = await global.hsContract.methods.decimals().call();
    decimals = parseInt(decimals);
    let transactionObj = await global.hsContract.methods.transfer(
        receiverAddress,
        new BigNumber(amount * 10 ** decimals)
    ).send({from:senderAddress});
    console.log(`${transactionObj['transactionHash']}`);
    let transactionHash = transactionObj['transactionHash'];
    let currTimeMilli = moment().format('x');
    putItemToDB(DB_COLLECTION['TRANSACTION_HASH'], currTimeMilli, {hash:transactionHash});
    await global.web3.eth.getTransaction(transactionHash).then(console.log);
}

/**
 * 송금 함수 (sender to receiver)
 * @param {*} senderAddress 전송측 주소
 * @param {*} receiverAddress 송신측 주소
 * @param {*} amount 보낼 금액
 * @returns {int} 성공 여부 (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201)
 */
async function remittanceCoin(senderAddress, receiverAddress, amount) {
    let resultCode = 0;
    let currTimeMilli = moment().format('x');
    let senderId = await getUserId(senderAddress);
    let receiverId = await getUserId(receiverAddress); 
    let accountPassword = await getAccountPassword(senderAddress);
    let remitInfo = {
        senderAddress:senderAddress,
        senderId:senderId,
        receiverAddress:receiverAddress,
        receiverId:receiverId,
        amount:amount,
        transactionType:TRANSACTION_TYPE['REMITTANCE'],
        transactionTime:moment().format('YYYY-MM-DD HH:mm:ss')
    };

    if(await isAddressInDB(senderAddress) && await isAddressInDB(receiverAddress)) {
        console.log("### remittance address check true");
        let senderBalance = await balanceInquiry(senderAddress);
        senderBalance = parseInt(senderBalance);
        amount = parseInt(amount);
        if(senderBalance >= amount) {
            console.log("### remittance balance check true");
            await global.web3.eth.personal.unlockAccount(senderAddress, accountPassword);
            await transferHSC(senderAddress, receiverAddress, amount);
            putItemToDB(DB_COLLECTION['TRANSACTION_LOG'], currTimeMilli, remitInfo);
            resultCode = RETURN_CODE['SUCCESS'];
            console.log(`### remittance return code SUCCESS(${RETURN_CODE['SUCCESS']})`);
        } else {
            console.log("### remittance balance check false");
            resultCode = RETURN_CODE['NOT_ENOUGH_MONEY'];
            console.log(`### remittance return code NOT_ENOUGH_MONEY(${RETURN_CODE['NOT_ENOUGH_MONEY']})`);
        }         
    } else {
        console.log("### remittance balance check false");
        resultCode = RETURN_CODE['NONE_ADDRESS'];
        console.log(`### remittance return code NONE_ADDRESS(${RETURN_CODE['NONE_ADDRESS']})`);
    }

    return resultCode;
}

/**
 * 가맹점 주소로 결제 진행
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @returns {int} 성공 여부 (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201)
 */
// 
async function paymentCoin(senderAddress, receiverAddress, amount) {
    let resultCode = 0;
    let currTimeMilli = moment().format('x');
    let senderId = await getUserId(senderAddress);
    let receiverId = await getUserId(receiverAddress); 
    let accountPassword = await getAccountPassword(senderAddress);
    let paymentInfo = {
        senderAddress:senderAddress,
        senderId:senderId,
        receiverAddress:receiverAddress,
        receiverId:receiverId,
        amount:amount,
        transactionType:TRANSACTION_TYPE['PAYMENT'],
        transactionTime:moment().format('YYYY-MM-DD HH:mm:ss')
    };

    if(await isAddressInDB(senderAddress) && await isAddressInDB(receiverAddress)) {
        console.log("### payment address check true");
        let senderBalance = await balanceInquiry(senderAddress);
        senderBalance = parseInt(senderBalance);
        amount = parseInt(amount);
        if(senderBalance >= amount) {
            console.log("### payment balance check true");
            await global.web3.eth.personal.unlockAccount(senderAddress, accountPassword);
            await transferHSC(senderAddress, receiverAddress, amount);
            putItemToDB(DB_COLLECTION['TRANSACTION_LOG'], currTimeMilli, paymentInfo);
            resultCode = RETURN_CODE['SUCCESS'];
            console.log(`### payment return code SUCCESS(${RETURN_CODE['SUCCESS']})`);
        } else {
            console.log("### payment balance check false");
            resultCode = RETURN_CODE['NOT_ENOUGH_MONEY'];
            console.log(`### payment return code NOT_ENOUGH_MONEY(${RETURN_CODE['NOT_ENOUGH_MONEY']})`);
        }         
    } else {
        console.log("### payment balance check false");
        resultCode = RETURN_CODE['NONE_ADDRESS'];
        console.log(`### payment return code NONE_ADDRESS(${RETURN_CODE['NONE_ADDRESS']})`);
    }

    console.log(resultCode);
    return resultCode;
}

/**
 * 가맹점 주소로 결제 진행
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @param {string} productName 상품 이름
 * @returns {int} 성공 여부 (성공: 100, 송신측 주소 없음: 200, 잔액부족: 201)
 */
// 
async function buyProduct(senderAddress, receiverAddress, amount, productName) {
    let resultCode = 0;
    let currTimeMilli = moment().format('x');
    let senderId = await getUserId(senderAddress);
    let receiverId = await getUserId(receiverAddress); 
    let accountPassword = await getAccountPassword(senderAddress);
    let paymentInfo = {
        senderAddress:senderAddress,
        senderId:senderId,
        receiverAddress:receiverAddress,
        receiverId:receiverId,
        amount:amount,
        productName:productName,
        transactionType:TRANSACTION_TYPE['PAYMENT'],
        transactionTime:moment().format('YYYY-MM-DD HH:mm:ss')
    };

    if(await isAddressInDB(senderAddress) && await isAddressInDB(receiverAddress)) {
        console.log("### payment address check true");
        let senderBalance = await balanceInquiry(senderAddress);
        senderBalance = parseInt(senderBalance);
        amount = parseInt(amount);
        if(senderBalance >= amount) {
            console.log("### payment balance check true");
            await global.web3.eth.personal.unlockAccount(senderAddress, accountPassword);
            await transferHSC(senderAddress, receiverAddress, amount);
            putItemToDB(DB_COLLECTION['TRANSACTION_LOG'], currTimeMilli, paymentInfo);
            resultCode = RETURN_CODE['SUCCESS'];
            console.log(`### payment return code SUCCESS(${RETURN_CODE['SUCCESS']})`);
        } else {
            console.log("### payment balance check false");
            resultCode = RETURN_CODE['NOT_ENOUGH_MONEY'];
            console.log(`### payment return code NOT_ENOUGH_MONEY(${RETURN_CODE['NOT_ENOUGH_MONEY']})`);
        }         
    } else {
        console.log("### payment balance check false");
        resultCode = RETURN_CODE['NONE_ADDRESS'];
        console.log(`### payment return code NONE_ADDRESS(${RETURN_CODE['NONE_ADDRESS']})`);
    }

    console.log(resultCode);
    return resultCode;
}


module.exports = {
    transferETH, 
    transferHSC,
    remittanceCoin,
    paymentCoin,
    buyProduct
}