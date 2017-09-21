var express = require("express"),
    http = require("http"),
    serverPort = process.env.OPENSHIFT_NODEJS_PORT || 1000,
    serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";


var app = express();

require("./config")(app);
require("./config/routes")(app);

var server = http.createServer(app).listen(serverPort, serverIpAddress);
server.on("listening", function(){
    console.log("Server berhasil berjalan dengan IP ADDRESS : "+serverIpAddress+" dan PORT : " + serverPort);
}).on("error", function(){
    console.log("Server terjadi kesalahan");
});