const fs = require("fs");
const path = require("path");

//Hscoin 관련 정보
// const HSCOIN_ADDRESS = '0x4551899d1ef9cE15E2bD06589d7a9F7d3df9dc3f'; // hscoin 컨트랙트 주소
//const HSCOIN_ADDRESS = '0x3C5738f553d33417c327f92581d4EeFAf6237501'; // hscoin 컨트랙트 주소
// const HSCOIN_ADDRESS = "0x0CC19478F98c0b30eE9316c97B45c94Df148AbE0";
const HSCOIN_ADDRESS = "0x026a5eC80be59AD36E6420eF57496D51334f53e5";
const HSCOIN_JSON_FILE = path.join(
  __dirname,
  "../../hscoin-contract/build/contracts/Hscoin.json"
);
const HSCOIN_JSON_PARSED = JSON.parse(fs.readFileSync(HSCOIN_JSON_FILE));
const HSCOIN_ABI = HSCOIN_JSON_PARSED.abi;

const RETURN_CODE = {
  SUCCESS: 100,
  NONE_ADDRESS: 200,
  NOT_ENOUGH_MONEY: 201,
  PASSWORD_ERR: 202,
  ALREADY_EXIST: 203,
  NONE_ID: 204,
};

const DB_COLLECTION = {
  USERS: "users",
  FRANCHISE: "franchise",
  TRANSACTION_LOG: "transaction_log",
  TRANSACTION_HASH: "transaction_hash",
  PRODUCT: "product",
  VIDEO: "video",
  VIDEO_LOG: "video_log",
  POINT_LOG: "point_log",
  QUIZ_LOG: "quiz_log",
  QUESTION: "question",
  FAVICON: "favicon",
};

const TRANSACTION_TYPE = {
  PAYMENT: "payment",
  REMITTANCE: "remittance",
};

const POINT = 1;
const POINT_MAXIMUM = 20;

module.exports = {
  HSCOIN_ADDRESS,
  HSCOIN_JSON_FILE,
  HSCOIN_JSON_PARSED,
  HSCOIN_ABI,
  RETURN_CODE,
  DB_COLLECTION,
  TRANSACTION_TYPE,
  POINT,
  POINT_MAXIMUM,
};
