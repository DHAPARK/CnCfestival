const admin = require("firebase-admin");
const auth = require("firebase-admin/auth");
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

async function initDB() {
    global.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    }, 'storage');
    console.log(`### DB Init`);
}



global.login = auth.getAuth();
global.db = firestore.getFirestore();
global.storage = global.firebaseAdmin.storage().bucket();

module.exports = {
    firestore,
    initWeb3,
    initDB
}
