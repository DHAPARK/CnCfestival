const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const serviceAccount = require("../hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");
const Web3 = require('web3');

const { HSCOIN_ABI, HSCOIN_ADDRESS } = require('../utils/constant');

const firebaseConfig = {
    apiKey: "AIzaSyAHUg25ak_qTeKbHathmfnMuey4UeJTrkQ",
    authDomain: "hscoin-d8ff7.firebaseapp.com",
    projectId: "hscoin-d8ff7",
    storageBucket: "hscoin-d8ff7.appspot.com",
    messagingSenderId: "928676142936",
    appId: "1:928676142936:web:72e7970feb2b29c792cf2d",  
    measurementId: "G-86FLCDRTND",
    credential: admin.credential.cert(serviceAccount)
};

const gcs = require('@google-cloud/storage')({keyFilename: '../hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json'});

const bucket = gcs.bucket(bucket);
const file = bucket.file('test/test_img1.jpeg');

file.getSignedUrl({
    action: 'read',
    expires: '03-0-2491'
}).then(signedUrls => {
    console.log(signedUrls[0]);
})



/**
 * Web3, HsContract 객체 생성
 */
async function initWeb3() {
    global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    global.accountList = await web3.eth.getAccounts();
    global.hsContract = new web3.eth.Contract(HSCOIN_ABI, HSCOIN_ADDRESS);
    console.log(`### Web3 Init`);
}

global.firebaseAdmin = admin.initializeApp(firebaseConfig);

// global.firebaseAdmin = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'hscoin-d8ff7.appspot.com/test'
// });

async function initDB() {
    global.db = firestore.getFirestore();
    global.storage = await global.firebaseAdmin.storage().bucket('gs://hscoin-d8ff7.appspot.com/test/');
}


module.exports = {
    firestore,
    initWeb3,
    initDB
}
