const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const Iconv = require('iconv').Iconv;
const jschardet = require('jschardet');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//임시 파일명 : 숫자 pf + cnt 숫자 + .py
var cnt = 0;

//알파벳,숫자인지 체크하는 메서드
function isAlphaNumCheck(str) {
    const rgxstr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j"
,"k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J"
,"K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",":","(",")","_"," ","\n","=",'"',"'","+",
"-","*","/","!","#","@","$","%","^","&","\\","/","|",".",",","?","<",">","`","~","[","]","\t","/t"]
    var Flag = false;
    for(var i=0;i<rgxstr.length;i++){
        if(str == rgxstr[i]){
            Flag = true;
        }
    }

    return Flag;
}

app.use(cors());

app.post('/makeAndCompilePythonFile', async (req,res)=>{
    let code = decodeURIComponent(req.body.code);
    //let { userId } = req.body
    //console.log(code);
    
    // for(let i=0; i < code.length ; i++){
    //     if(!isAlphaNumCheck(code[i])){
    //         code = code.replace(code[i]," ");
    //     }
    // }

    console.log(code);
    fs.writeFileSync(`pf${0}.py`, code, "utf8", (err)=>{
        if(err){
            console.log(`${err}\npython 파일생성에 문제발생`);
        }
    })
    //파일제대로 생기나 확인해야함
    
    //파일이 제대로 생성이 되는걸 확인했으니 "방금 만들어진" 파이썬파일 그대로 컴파일
    const spawn = require("child_process").spawn;
    const result = spawn('python3',[`pf${0}.py`]);
    
    
    return new Promise(resolve => {
        result.stdout.on('data', (data)=>{
            console.log(data.toString());
            resolve(data.toString());
        })
        result.stderr.on('data', (data)=>{
            console.log(data.toString());
            resolve(data.toString());
        });
        resolve('none');
    });
})

app.listen(3000,()=>{
    console.log('3000번 포트로 포트 실행중..');
})