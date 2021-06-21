const fs = require('fs');
var https = require('https');

const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
var router = require('./routes/router');
const app = express();



var keyPath = '../../etc/nginx/cert/5829799_aiq.group.key';
var certPath = '../../etc/nginx/cert/5829799_aiq.group.pem';
var hskey = fs.readFileSync(keyPath);
var hscert = fs.readFileSync(certPath);



//解析 application/json
app.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//设定静态文件目录
app.use(express.static(path.resolve(__dirname, './public')));
//对请求的接口进行路由转接；
app.use('/agent', router);
//请求任意路径时候返回index.html文件到客户端，保证客户端用到路由情况下的刷新不失效；
app.get('*', function(req, res) {
        const html = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8')
        res.send(html);
    })
    //设定服务器启动端口，开启前端项目；
    // app.listen(5002, () => console.log("启动"));


// https
var server = https.createServer({
    key: hskey,
    cert: hscert
}, app);

server.listen(5002, function() {
    console.log("启动")
        // console.log('runing Web Server in ' + port + ' port...');
});


//************************************************************************************************** */
// app.post('/', (req, res) => {
//     console.log(req.headers);
//     console.log("wwwwwwwwwwwwwwwwwwwwwwwww");
//     console.log(req.header());
//     if (req) {
//         res.json('{aaa:"abcdefg"}');
//     }
//     console.log("aaaa");
// })
// app.use(express.static(path.resolve(__dirname, './public'))).listen(8080);