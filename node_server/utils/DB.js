<<<<<<< HEAD
const { RETURN_CODE, DB_COLLECTION } = require('./constant')
=======
const { RETURN_CODE, DB_COLLECTION } = require('./constant');
const { db } = require('../config/envConfig');
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
const { getUserInfo } = require('./inquiry');

/////////////////////////////////////////
// DB 관련 함수

/**
 * DB에 값 추가
 * @param {string} collectionName 컬렉션 이름
 * @param {string} documentName 문서 이름
 * @param {object} dataObject 저장될 객체(JSON)
 */
 async function putItemToDB(collectionName, documentName, dataObject) {
<<<<<<< HEAD
    let ps = await global.db.collection(collectionName);
=======
    let ps = await db.collection(collectionName);
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
    ps.doc(documentName).set(dataObject);
    console.log(`### DB ${documentName} save`);
}

/**
 * DB에 값 삭제
 * @param {*} collectionName 
 * @param {*} documentName 
 */
async function removetemToDB(collectionName, documentName) {
<<<<<<< HEAD
    let ps = await global.db.collection(collectionName);
=======
    let ps = await db.collection(collectionName);
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
    ps.doc(documentName).delete();
    console.log(`### DB ${documentName} delete`);
}

/**
 * DB에 값 수정
 * @param {string} collectionName 
 * @param {string} documentName 
 * @param {obejct} dataObject 
 */
async function modifyDBItem(collectionName, documentName, dataObject) {
<<<<<<< HEAD
    let userRef = await global.db.collection(collectionName).doc(documentName);
=======
    let userRef = await db.collection(collectionName).doc(documentName);
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
   
    return new Promise(resolve => {
        userRef.update({
            username:dataObject['username'],
            userpw:dataObject['userpw'],
            useremail:dataObject['useremail'],
            userphone:dataObject['userphone']
        });
        console.log(`### DB ${documentName} update`);
        resolve(RETURN_CODE['SUCCESS']);
    })
}

/**
 * 즐겨찾기 추가
 * @param {string} userId
 * @param {obj} faviconObject 
 */
async function addFavicon(userId, faviconObject) {
<<<<<<< HEAD
    let userFaviconRef = await global.db.collection(DB_COLLECTION['FAVICON']);
=======
    let userFaviconRef = await db.collection(DB_COLLECTION['FAVICON']);
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
    let faviconName = await getUserInfo(faviconObject['userId']);
    faviconObject.userName = faviconName['username'];
    let ownerRef = await userFaviconRef.where('owner', '==', userId)
    .where('userId', '==', faviconObject['userId']).get();
    
    return new Promise(resolve => {
        if(ownerRef.size == 0) {
            userFaviconRef.add(faviconObject);
            console.log(`### DB ${faviconObject} save`);
            resolve(RETURN_CODE['SUCCESS']);
        } else {
            console.log(`### DB ${faviconObject} not save`);
            resolve(RETURN_CODE['ALREADY_EXIST']);
        }
    });
}

/**
 * 즐겨찾기 삭제
 * @param {string} userId
 * @param {string} faviconName 
 */
async function removeFavicon(userId, faviconName) {
<<<<<<< HEAD
    let userFaviconRef = await global.db.collection(DB_COLLECTION['FAVICON']);
=======
    let userFaviconRef = await db.collection(DB_COLLECTION['FAVICON']);
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
    let ownerRef = await userFaviconRef.where('owner', '==', userId)
    .where('userId', '==', faviconObject['userId']).get();
    
    return new Promise(resolve => {
        if(ownerRef.size == 0) {
            userFaviconRef.add(faviconObject);
            console.log(`### DB ${faviconObject} save`);
            resolve(RETURN_CODE['SUCCESS']);
        } else {
            console.log(`### DB ${faviconObject} not save`);
            resolve(RETURN_CODE['ALREADY_EXIST']);
        }
    })
}

/**
 * 즐겨찾기 목록 불러오기
 * @param {string} userId 
 * @return {list}
 */
async function getFaviconList(userId) {
<<<<<<< HEAD
    let faviconList = await global.db.collection(DB_COLLECTION['FAVICON']).where('owner', '==', userId).get();
=======
    let faviconList = await db.collection(DB_COLLECTION['FAVICON']).where('owner', '==', userId).get();
>>>>>>> 59c535fb923fdeb0c2a4b41eb137fd295806445d
    return new Promise(resolve => {
        let faviconObj = {};
        faviconList.forEach(doc => {
            let data = doc.data();
            let key = doc.data()['userName'];
            delete data['owner'];
            delete data['userName'];
            faviconObj[key] = data;
        });
        console.log(faviconObj);
        resolve(faviconObj);
    });
}

// DB 관련 함수
/////////////////////////////////////////

module.exports = {
    putItemToDB: putItemToDB, 
    removetemToDB: removetemToDB, 
    modifyDBItem: modifyDBItem, 
    addFavicon: addFavicon, 
    removeFavicon: removeFavicon, 
    getFaviconList: getFaviconList 
}