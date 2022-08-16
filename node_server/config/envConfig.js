const admin = require("firebase-admin");
const app = require('firebase-admin/app');
const firestore = require('firebase-admin/firestore');

const serviceAccount = require("../hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");
const Web3 = require('web3');

const { HSCOIN_ABI, HSCOIN_ADDRESS } = require('../utils/constant');

const firebaseConfig = {
    apiKey: "AIzaSyAHUg25ak_qTeKbHathmfnMuey4UeJTrkQ",
    authDomain: "hscoin-d8ff7.firebaseapp.com",
    projectId: "hscoin-d8ff7",
    messagingSenderId: "928676142936",
    appId: "1:928676142936:web:72e7970feb2b29c792cf2d",  
    measurementId: "G-86FLCDRTND",
    credential: admin.credential.cert(serviceAccount)
};

const { Storage } = require('@google-cloud/storage');
// const { credential } = require("firebase-admin");
// const projectId = 'hscoin-d8ff7';
// const storage = new Storage({
//     projectId: projectId,
//     credential: admin.credential.cert(serviceAccount)
// });

async function generateV4ReadSignedUrl() {
    // These options will allow temporary read access to the file
    const options = {
        version: 'v4',
        action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const [url] = await storage
        .bucket('test')
        .file('test_img1.jpeg')
        .getSignedUrl(options);

    console.log('Generated GET signed URL:');
    console.log(url);
    console.log('You can use this URL with any user agent, for example:');
    console.log(`curl '${url}'`);
}

/**
 * Web3, HsContract 객체 생성
 */
async function initWeb3() {
    global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    global.accountList = await web3.eth.getAccounts();
    global.hsContract = new web3.eth.Contract(HSCOIN_ABI, HSCOIN_ADDRESS);
    console.log(`### Web3 Init`);
}

global.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://hscoin-d8ff7.appspot.com/'
}, "storage");

// global.firebaseAdmin = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'hscoin-d8ff7.appspot.com/test'
// });

async function initDB() {
    global.storage = await global.firebaseAdmin.storage();
    global.db = admin.firestore();
    //global.db = firestore.getFirestore();
}


module.exports = {
    initWeb3,
    initDB,
    generateV4ReadSignedUrl
}
