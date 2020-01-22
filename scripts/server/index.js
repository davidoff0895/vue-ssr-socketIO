const app = require('./server');
const server = require('http').Server(app);
const commonConfig = require('./config/common.conf');
const PORT = commonConfig.PORT;
const io = require('socket.io')(server);

server.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`server listening on :${PORT} port`);
});
io.on('connection', (socket) => {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', (data) => {
    console.log(data)
  })
});
