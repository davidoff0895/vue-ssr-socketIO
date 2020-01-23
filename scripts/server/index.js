const app = require('./server');
const server = require('http').Server(app);
const commonConfig = require('./config/common.conf');
const PORT = commonConfig.PORT;
const io = require('socket.io')(server);
const info = require('./common/info');
const randomise = require('./randomise');

server.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`server listening on :${PORT} port`);
});
io.on('connection', (socket) => {
  const tweets = setInterval(() => {
    const result = randomise(info);
    socket.emit('news', result.tableInfo);
    if (result.matchesIsEnded) {
      clearInterval(tweets);
    }
  }, 1000);
});
