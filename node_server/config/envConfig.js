const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("../hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");
const Web3 = require('web3');

const { HSCOIN_ABI, HSCOIN_ADDRESS } = require('../utils/constant');

/**
 * Web3, HsContract 객체 생성
 */
async function initWeb3() {
    global.web3 = new Web3('http://127.0.0.1:8545');
    global.accountList = await web3.eth.getAccounts();
    global.hsContract = await new web3.eth.Contract(HSCOIN_ABI, HSCOIN_ADDRESS);
    console.log(`### Web3 Init`);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'hscoin-d8ff7.appspot.com/test'
}, 'storage');


global.db = firestore.getFirestore();
//global.storage = await .storage().bucket();

module.exports = {
    firestore,
    initWeb3
}
