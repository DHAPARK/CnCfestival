const { DB_COLLECTION, POINT_MAXIMUM, POINT} = require('./constant');
const { putItemToDB } = require('./DB');
const env = require('../config/envConfig');

/////////////////////////////////////////
// 정보 조회 관련 함수

/**
 * 계정의 HSC 보유값 리턴
 * @param {string} inquiryAddress 조회할 계정 주소
 * @returns {float} ETH 값으로 리턴
 */
async function balanceInquiry(inquiryAddress) {
    let hsBalanceWei = await global.hsContract.methods.balanceOf(inquiryAddress).call();
    let hsBalanceEth = global.web3.utils.fromWei(hsBalanceWei, 'ether');
    console.log(`### hsBalance = ${hsBalanceEth}`);
    return hsBalanceEth;
}

/**
 * 유저 계정 비밀번호를 가져오는 함수
 * @param {string} inquiryAddress 
 * @returns 유저 아이디
 */
 async function getUserPointLog(userId, videoUrl) {
    let pointLogRef = await global.db.collection(DB_COLLECTION["POINT_LOG"]);
    let snapShot = await pointLogRef.where('userId', '==', userId)
    .where('videoUrl', '==', videoUrl).get();
    
    let pointLogObj = {};
    return new Promise(resolve => {
        snapShot.forEach(doc => {
            pointLogObj[doc.id] = doc.data();
        })
        resolve(pointLogObj);
    });
}
async function calcPointLog(pointLogObj) {
    let pointTotal = 0;

    return new Promise(resolve => {
        Object.keys(pointLogObj).forEach((value) => {
            pointTotal += pointLogObj[value]['point'];
        })
        resolve(pointTotal);
    });
}

//async function getQuiz

async function calcPoint(userId, videoUrl, watchLength) {
    let tempPoint = POINT * watchLength;
    let pointLogObj = await getUserPointLog(userId, videoUrl);
    let totalPoint = await calcPointLog(pointLogObj);

    if (totalPoint >= POINT_MAXIMUM) {
        return 0;
    } else {
        return tempPoint;
    }
}

/**
 * DB에서 프랜차이즈 정보를 가져옴
 * @returns {object} 프랜차이즈 정보들 obejct
 */
 async function getFranchise() {
    let franchiseObj = {};
    let ps = await global.db.collection(DB_COLLECTION['FRANCHISE']).get();
    return new Promise(resolve => {
        ps.forEach(doc => {
            franchiseObj[doc.id] = doc.data();
        });
        resolve(franchiseObj);
    });
}

/**
 * DB에서 상품 정보를 가져옴
 * @returns {object} 상품 정보들 obejct
 */
async function getProductInfo() {
    let productObj = [];
    let ps = await global.db.collection(DB_COLLECTION['PRODUCT']).get();
    return new Promise(resolve => {
        ps.forEach(doc => {
            let temp = doc.data();
            temp['productId'] = doc.id;
            productObj.push(temp);
        });
        resolve(productObj);
    })
}

/**
 * DB에서 강의 정보를 가져옴
 * @returns {object} 강의 정보들 obejct
 */
 async function getQuizInfo() {
    let quizObj = [];
    let ps = await global.db.collection(DB_COLLECTION['QUESTION']).get();
    return new Promise(resolve => {
        ps.forEach(doc => {
            let temp = doc.data();
            temp['quizId'] = doc.id;
            quizObj.push(temp);
        });
        resolve(quizObj);
    })
}

/**
 * DB에서 강의 정보를 가져옴
 * @returns {object} 강의 정보들 obejct
 */
 async function getVideoInfo() {
    let videoObj = [];
    let ps = await global.db.collection(DB_COLLECTION['VIDEO']).get();
    return new Promise(resolve => {
        ps.forEach(doc => {
            let temp = doc.data();
            temp['videoId'] = doc.id;
            videoObj.push(temp);
        });
        resolve(videoObj);
    })
}

/**
 * DB에서 강의 정보를 가져옴
 * @returns {object} 강의 정보들 obejct
 */
 async function getVideoWatchInfo(userId) {
    let videoWatchObj = [];
    let watchLogRef = await global.db.collection(DB_COLLECTION['VIDEO_LOG']).doc("aaaa1234").get();

    return new Promise(resolve => {
        console.log(`logRef empty = ${JSON.stringify(watchLogRef)}`);
        if (watchLogRef.empty) {
            watchLogRef.forEach(doc => {
                let temp = doc.collection(doc.id).get().data();
                temp['videoName'] = doc.id;
                console.log(`temp = ${temp}`);
                videoWatchObj.push(temp);
            });
        }
        console.log(`videoWathcObj = ${videoWatchObj}`);
        console.log(JSON.stringify(videoWatchObj));
        resolve(videoWatchObj);
    });
}

/**
 * DB에서 강의 정보를 가져옴
 * @returns {object} 강의 정보들 obejct
 */
 async function setUserVideoLog(userId, videoLogObject) {
    let videoLogRef = await global.db.collection(DB_COLLECTION['VIDEO_LOG']).doc(userId);
    return new Promise( async (resolve) => {
        if (videoLogRef.empty) {
            putItemToDB(DB_COLLECTION['VIDEO_LOG'], userId, videoLogObject);
        } else {
            let snapShot = await videoLogRef.where('videoNum', '==', videoNum).get();
            if (snapShot.empty) {
                resolve(undefined);
            } else {
                snapShot.forEach(doc => {
                    videoLog[doc.id] = doc.data();
                })
                resolve(videoLog);
            }
            
        }
    })
}

/**
 * DB에서 강의 정보를 가져옴
 * @returns {object} 강의 정보들 obejct
 */
 async function getUserVideoLog(userId, videoName) {
    let videoLog = {};
    let videoLogRef = await global.db.collection(DB_COLLECTION['VIDEO_LOG']).doc(userId).collection(videoName);
    let snapShot = await videoLogRef.get();
    return new Promise(resolve => {
        snapShot.forEach(doc => {
            videoLog = doc.data();
        })
        resolve(videoLog);
    })
}


/**
 * DB에서 프랜차이즈 정보를 가져옴
 * @returns {object} 프랜차이즈 정보들 obejct
 */
 async function getFranchise() {
    let franchiseObj = {};
    let ps = await global.db.collection(DB_COLLECTION['FRANCHISE']).get();
    return new Promise(resolve => {
        ps.forEach(doc => {
            franchiseObj[doc.id] = doc.data();
        });
        resolve(franchiseObj);
    });
}

/**
 * 이용내역 쿼리
 * @param {string} inquiryAddress 조회할 계정 주소
 * @returns {object} 계정주소가 보내거나 받은 정보 객체
 */
 async function getTransactionLog(inquiryAddress) {
    let logObj = {};
    let transactionRef = await global.db.collection(DB_COLLECTION["TRANSACTION_LOG"]);
    return new Promise(async (resolve) => {
        await transactionRef.where('receiverAddress', 'in', [inquiryAddress])
        .get()
        .then(res => {
            res.forEach(result => {
                logObj[result.id] = result.data();
            })
        }); 
        await transactionRef.where('senderAddress', 'in', [inquiryAddress])
        .get()
        .then(res => {
            res.forEach(result => {
                logObj[result.id] = result.data();
            })
            let keys = Object.keys(logObj);
            logObj = Object.keys(logObj).map(item => logObj[item]);
            logObj = logObj.sort(function (obj1, obj2) {
                let key1 = obj1['transactionTime'];
                let key2 = obj2['transactionTime'];
                return key1 > key2 ? -1 : 1;
            });
            resolve(logObj);
        });
    })
}

/**
 * 모든 유저들의 Balance를 조회
 * @returns {obejct} 모든 유저의 Balance 정보 객체 리턴
 */
 async function getAllUserBalance() {
    let userRank = [];
    let userInfo = {};
    let allUserInfoRef = await global.db.collection(DB_COLLECTION['USERS']).get();
    allUserInfoRef.forEach(doc => {
        console.log(doc.id, doc.data());
        userInfo[doc.id] = doc.data();
    })

    for(user in userInfo) {
        console.log(userInfo[user]['accountAddress']);
        let balance = await balanceInquiry(userInfo[user]['accountAddress']);
        console.log(balance);
        let tempObj = {
            user:user,
            balance:parseInt(balance)
        }
        userRank.push(tempObj);
    }
    
    return new Promise(resolve => {
        console.log(userRank);
        userRank = userRank.sort((user1, user2) => {
            return user2.balance - user1.balance;
        });
        if(userRank.length > 6) {
            userRank = userRank.slice(0, 6);
        }
        resolve(userRank);
    });
}

/**
 * 가입된 유저 정보를 가져옴
 * @param {string} userId 
 * @returns {object} 유저 정보 객체
 */
async function getUserInfo(userId) {
    let userInfoRef = await global.db.collection(DB_COLLECTION["USERS"]);
    let snapShot = await userInfoRef.where('userid', '==', userId).get();
    return new Promise(resolve => {
        snapShot.forEach(doc => {
            resolve(doc.data());
        })
    })
}

/**
 * 유저 아이디를 가져오는 함수
 * @param {string} inquiryAddress 
 * @returns 유저 아이디
 */
 async function getUserId(inquiryAddress) {
    let userInfoRef = await global.db.collection(DB_COLLECTION["USERS"]);
    let snapShot = await userInfoRef.where('accountAddress', '==', inquiryAddress).get();
    return new Promise(resolve => {
            snapShot.forEach(doc => {
            resolve(doc.data().userid);
        })
    })
}

/**
 * 유저 계정 비밀번호를 가져오는 함수
 * @param {string} inquiryAddress 
 * @returns 유저 아이디
 */
 async function getAccountPassword(inquiryAddress) {
    let userInfoRef = await global.db.collection(DB_COLLECTION["USERS"]);
    let snapShot = await userInfoRef.where('accountAddress', '==', inquiryAddress).get();
    return new Promise(resolve => {
            snapShot.forEach(doc => {
            resolve(doc.data().accountPassword);
        })
    })
}


/**
 * 최근 거래된 계정 정보를 가져옴
 * @param {string} inquiryAddress 
 * @returns {obejct} 계정 정보 객체
 */
 async function getRecentTransferAccount(inquiryAddress) {
    let recentObj = new Map();
    let logObj = await getTransactionLog(inquiryAddress);

    return new Promise(resolve => {
        logObj.forEach(doc => {
            let senderAddress = doc['senderAddress'];
            let receiverAddress = doc['receiverAddress'];
            if(senderAddress == inquiryAddress) {
                recentObj.set(doc['receiverId'], doc['receiverAddress'])
            } else {
                recentObj.set(doc['senderId'], doc['senderAddress'])
            }
        })
        resolve(recentObj);
    })
}


/**
 * 유저의 즐겨찾기 내역 조회
 * @param {string} userId 
 */
async function getUserFaviconList(userId) {
    
}

// 정보 조회 관련 함수
/////////////////////////////////////////

module.exports = {
    balanceInquiry, 
    getFranchise, 
    getProductInfo,
    getVideoInfo,
    getQuizInfo,
    calcPoint,
    getUserVideoLog,
    setUserVideoLog,
    getTransactionLog, 
    getAllUserBalance, 
    getUserInfo, 
    getUserId,
    getVideoWatchInfo,
    getAccountPassword,
    getAccountPassword, 
    getRecentTransferAccount 
}