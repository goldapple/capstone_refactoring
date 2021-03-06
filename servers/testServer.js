var net = require("net"); // 서버를 생성
var server = net.createServer(function (socket) {
  console.log(socket.address().address + " connected.");
  // client로 부터 오는 data를 화면에 출력
  socket.on("data", function (data) {
    console.log("rcv:" + data);
    setTimeout(() => {
      socket.write("true");
    }, 3000);
  });
  // client와 접속이 끊기는 메시지 출력
  socket.on("close", function () {
    console.log("client disconnted.");
  });
  // client가 접속하면 화면에 출력해주는 메시지
});
// 에러가 발생할 경우 화면에 에러메시지 출력
server.on("error", function (err) {
  console.log("err" + err);
});
// Port 5000으로 접속이 가능하도록 대기
server.listen(10000, function () {
  console.log("linsteing on 5000..");
});
