const express = require("express");
const userRouter = require("./user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const model = require("./model");
const Chat = model.getModels("chat");
// Chat.remove({},function(){

// })
io.on("connection", function(socket) {
  socket.on("sendMsg", function(data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join("-");
    Chat.create(
      { chatid, from, to, content: msg, create_time: new Date().getTime() },
      function(err, doc) {
        if (!err) {
          io.emit("recvMsg", doc);
        }
      }
    );
  });
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);

server.listen(9093, function() {
  console.log("app listening on localhost:9093");
});
