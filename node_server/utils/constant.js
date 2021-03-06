const fs = require('fs');
const path = require('path');

//Hscoin 관련 정보
const HSCOIN_ADDRESS = '0xF2487613e9a890B6AaC89cDcEDBA8aa62A7Dd380'; // hscoin 컨트랙트 주소
const HSCOIN_JSON_FILE = path.join(__dirname, '../../hscoin-contract/build/contracts/Hscoin.json');
const HSCOIN_JSON_PARSED = JSON.parse(fs.readFileSync(HSCOIN_JSON_FILE));
const HSCOIN_ABI = HSCOIN_JSON_PARSED.abi;

const RETURN_CODE = {
    'SUCCESS':100,
    'NONE_ADDRESS':200,
    'NOT_ENOUGH_MONEY':201,
    'PASSWORD_ERR':202,
    'ALREADY_EXIST':203,
    'NONE_ID':204,
};

const DB_COLLECTION = {
    'USERS':'users',
    'FRANCHISE':'franchise',
    'TRANSACTION_LOG':'transaction_log',
    'TRANSACTION_HASH':'transaction_hash',
    'FAVICON':'favicon'
};

const TRANSACTION_TYPE = {
    'PAYMENT':'payment',
    'REMITTANCE':'remittance',
};

module.exports = {
    HSCOIN_ADDRESS : HSCOIN_ADDRESS,
    HSCOIN_JSON_FILE : HSCOIN_JSON_FILE,
    HSCOIN_JSON_PARSED : HSCOIN_JSON_PARSED,
    HSCOIN_ABI : HSCOIN_ABI,
    RETURN_CODE : RETURN_CODE,
    DB_COLLECTION : DB_COLLECTION,
    TRANSACTION_TYPE : TRANSACTION_TYPE,
}