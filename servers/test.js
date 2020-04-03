var express = require("express");
const cors = require("cors");
var app = express();

var net = require("net");

var client = null;

app.use(express.json());
app.use(cors());

client = new net.Socket();

//로컬 121.143.22.128

app.post("/speakerConnect", function(req, res, next) {
  client.connect(5000, "127.0.0.1", function() {
    console.log("연결완료");
  });
  client.on("connect", function() {
    console.log("connect");
  });
  console.log("req", req.body);
  client.write("1 " + req.body.url);

  client.on("data", function(data) {
    console.log("Received:" + data);

    client.end();
  });
  client.on("timeout", function() {
    console.log("소켓 타임아웃");
  });

  client.on("error", function(err) {
    console.log(err);
  });

  client.on("end", function() {
    console.log("Connection end");
  });
  client.on("close", function() {
    console.log("Connection closed");
    client.pop();
  });
  res.send("test");
});

// app.post("/speakerConnect1", function(req, res, next) {
//   console.log("req", req.body);

//   client.write("2 이건 버튼 테스트");

//   client.on("data", function(data) {
//     console.log("Received: " + data);
//     if (data == "") {
//       console.log("유저에게 보냄");
//     } else {
//       console.log("코오딩");
//     }
//   });
// });
app.listen(3001, () => {
  console.log("start server");
});
