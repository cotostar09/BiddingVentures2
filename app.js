//모듈을 추출합니다.
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var express = require('express');

//생성자 함수 선언
var counter = 0;
function Product(name, image, price, count){
    this.index = counter++;
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
}

//변수 선언 
var Products = [
    new Product('Apache', 'Apache.png', 200, 100),
    new Product('Beauties', 'Apache.png', 200, 100),
    new Product('Crayon', 'Apache.png', 200, 100),
    new Product('Diet', 'Apache.png', 200, 100)
]

//웹 서버 생성
var app = express();
var server = http.createServer(app);

//웹 서버 설정
app.use(express.static(__dirname+'/public'));

//라우트 수행
app.get('/', function (request, respones){

});

//웹 서버 실행
server.listen(80,function(){
    console.log('Server Running at http://localhost/');
});

//소켓 서버 생성 및 실행
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){

})

