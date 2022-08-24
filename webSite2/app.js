const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('ajax');
    //res.json({ name: "홍길동"  ,  age: "18"});
})



app.get('/index', (req, res) => {
    //res.render('ajax',{ name: "홍길동"  ,  age: "18"});
    res.json({ name: "홍길동"  ,  age: "18"});
})

app.listen(3000, () => {
    console.log('3000번 포트에서 대기 중...');
})