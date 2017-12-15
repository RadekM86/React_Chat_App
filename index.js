const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', function(socket){
  console.log(`a user ${socket.id.slice(12)} connected`)
   
    socket.on('message', (message)=>{
      socket.broadcast.emit('message', JSON.parse(message))
    })
    socket.on('disconnect', function(socket){
      console.log(`user  disconnected`);
    });
  });
  







server.listen(4000);