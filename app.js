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
var products = [
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
    //HTMLPage.html 파일 읽기
    var htmlPage = fs.readFileSync('HTMLPage.html','utf8');

    //응답
    respones.send(ejs.render(htmlPage,{
        products: products
    }));
});



//웹 서버 실행
server.listen(80,function(){
    console.log('Server Running at http://localhost/');
});



//소켓 서버 생성 및 실행
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){

    //함수 선언
    function onReturn(index){
        
        //물건 개수 증가
        products[index].count++;

        //타이머 제거
        clearTimeout(cart[index].timerID);

        //카트에서 물건 제거
        delete cart[index];

        //count 이벤트 발생
        io.sockets.emit('count', {
            index : index,
            count : products[index].count
        });

    };      //END onReturn

    //변수 선언
    var cart = {};

    //cart EVENT
     socket.on('cart', function(index){
         //물건 개수 감소
         products[index].count--;
         
         //카트에 물건 놓고 타이머 시작
         cart[index] = {}
         cart[index].index = index;
         cart[index].timerID = setTimeout(function(){
             onReturn(index);
         }, 10 * 60 * 1000);

        //count 이벤트 발생
        io.sockets.emit('count', {
            index : index,
            count : products[index].count
        });

     });    //END cart EVENT


     //buy EVENT
     socket.on('buy', function(index){

         //타이머 제거
         clearTimeout(cart[index].timerID);

         //카트에서 물건 제거
         delete cart[index];

         //count 이벤트 발생
        io.sockets.emit('count', {
            index : index,
            count : products[index].count
        });

     });    //END buy EVENT

     //return EVENT
     socket.on('event' , function(index){
       onReturn(index);
    });    //END buy return


});         //END connection