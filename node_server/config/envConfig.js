const admin = require("firebase-admin");
const auth = require("firebase-admin/auth");
const firestore = require("firebase-admin/firestore");
const serviceAccount = require("../hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");
const Web3 = require('web3');

const constant = require('../utils/constant');

let accountList;
let hsContract;
let web3;

/**
 * Web3, HsContract 객체 생성
 */
async function initWeb3() {
    web3 = new Web3('http://127.0.0.1:8545');
    accountList = await web3.eth.getAccounts();
    hsContract = new web3.eth.Contract(constant.HSCOIN_ABI, constant.HSCOIN_ADDRESS);
    console.log("### Web3 Init");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const login = auth.getAuth();
const db = firestore.getFirestore();

module.exports = {
    firestore: firestore,
    login: login,
    db: db,

    initWeb3 : initWeb3,
    accountList: accountList,
    hsContract: hsContract,
    web3: web3,
}
